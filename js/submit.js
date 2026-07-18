import { db } from './firebase.js';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const COLLECTION_NAME = 'participants';

let isSubmitting = false;

function getFormElements() {
  const form = document.getElementById('participationForm');
  const submitButton = document.getElementById('submitBtn');
  return { form, submitButton };
}

function getFormMessageElement(form) {
  let messageBox = document.getElementById('formMessage');
  if (!messageBox && form) {
    messageBox = document.createElement('p');
    messageBox.id = 'formMessage';
    messageBox.className = 'form-message';
    form.appendChild(messageBox);
  }
  return messageBox;
}

function showFormMessage(message, type) {
  const { form } = getFormElements();
  const messageBox = getFormMessageElement(form);
  if (!messageBox) return;
  messageBox.textContent = message;
  messageBox.className = `form-message form-message--${type}`;
}

function clearFormMessage() {
  const messageBox = document.getElementById('formMessage');
  if (messageBox) {
    messageBox.textContent = '';
    messageBox.className = 'form-message';
  }
}

function setSubmittingState(submitButton, submitting) {
  if (!submitButton) return;
  if (submitting) {
    submitButton.disabled = true;
    if (!submitButton.dataset.originalText) {
      submitButton.dataset.originalText = submitButton.textContent;
    }
    submitButton.textContent = 'Enviando...';
  } else {
    submitButton.disabled = false;
    submitButton.textContent = submitButton.dataset.originalText || 'Participar';
  }
}

function getFieldValue(fieldId) {
  const element = document.getElementById(fieldId);
  if (!element) return '';
  if (element.type === 'checkbox') {
    return element.checked;
  }
  return element.value;
}

function getNormalizedPhone(rawPhone) {
  const digits = typeof window.normalizePhone === 'function'
    ? window.normalizePhone(rawPhone)
    : rawPhone.replace(/\D/g, '');

  return digits.startsWith('+') ? digits : `+${digits}`;
}

async function checkPhoneExists(normalizedPhone) {
  const docRef = doc(db, COLLECTION_NAME, normalizedPhone);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

async function checkEmailExists(email) {
  if (!email) {
    return false;
  }
  const participantsRef = collection(db, COLLECTION_NAME);
  const emailQuery = query(participantsRef, where('email', '==', email));
  const querySnap = await getDocs(emailQuery);
  return !querySnap.empty;
}

async function saveParticipant(normalizedPhone, data) {
  const docRef = doc(db, COLLECTION_NAME, normalizedPhone);
  await setDoc(docRef, {
    fullName: data.fullName,
    phone: normalizedPhone,
    email: data.email,
    province: data.province,
    instagram: data.instagram,
    origin: data.origin,
    status: 'active',
    createdAt: serverTimestamp()
  });
}

// ==================================================
// MODO DIAGNÓSTICO TEMPORÁRIO
// Mostra o erro técnico real no ecrã para conseguirmos
// identificar a causa exata em dispositivos móveis,
// sem depender da consola do browser.
// Remover depois de confirmada a causa.
// ==================================================
function getDiagnosticErrorMessage(error) {
  const code = error && error.code ? error.code : 'sem-codigo';
  const msg = error && error.message ? error.message : String(error);
  return `Erro técnico (diagnóstico): [${code}] ${msg}`;
}

async function handleSubmit(event) {
  event.preventDefault();

  if (isSubmitting) {
    return;
  }

  const { form, submitButton } = getFormElements();
  if (!form) {
    return;
  }

  clearFormMessage();

  const isValid = typeof window.validateForm === 'function' ? window.validateForm() : true;

  if (!isValid) {
    return;
  }

  const rawPhone = getFieldValue('phone');
  const normalizedPhone = getNormalizedPhone(rawPhone);

  const participantData = {
    fullName: getFieldValue('fullName'),
    email: getFieldValue('email'),
    province: getFieldValue('province'),
    instagram: getFieldValue('instagram'),
    origin: getFieldValue('origin')
  };

  isSubmitting = true;
  setSubmittingState(submitButton, true);

  try {
    const phoneExists = await checkPhoneExists(normalizedPhone);
    if (phoneExists) {
      showFormMessage('Este número já possui uma participação registada.', 'error');
      return;
    }

    const emailExists = await checkEmailExists(participantData.email);
    if (emailExists) {
      showFormMessage('Este email já possui uma participação registada.', 'error');
      return;
    }

    await saveParticipant(normalizedPhone, participantData);

    showFormMessage('Participação registada com sucesso!', 'success');
    form.reset();
  } catch (error) {
    console.error('❌ Erro ao registar participante:', error);
    showFormMessage(getDiagnosticErrorMessage(error), 'error');
  } finally {
    isSubmitting = false;
    setSubmittingState(submitButton, false);
  }
}

function initSubmitForm() {
  const { form } = getFormElements();
  if (!form) {
    return;
  }
  form.addEventListener('submit', handleSubmit);
}

initSubmitForm();
