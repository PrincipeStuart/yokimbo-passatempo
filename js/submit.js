import { db } from './firebase.js';
import { validateParticipantForm } from './validation.js';
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
  const submitButton = form ? form.querySelector('button[type="submit"]') : null;
  const messageBox = document.getElementById('formMessage');
  return { form, submitButton, messageBox };
}

function showMessage(messageBox, text, type) {
  if (!messageBox) return;
  messageBox.textContent = text;
  messageBox.className = `form-message form-message--${type}`;
  messageBox.style.display = 'block';
}

function clearMessage(messageBox) {
  if (!messageBox) return;
  messageBox.textContent = '';
  messageBox.className = 'form-message';
  messageBox.style.display = 'none';
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
    submitButton.textContent = submitButton.dataset.originalText || 'Participar Agora';
  }
}

async function checkPhoneExists(normalizedPhone) {
  const docRef = doc(db, COLLECTION_NAME, normalizedPhone);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

async function checkEmailExists(email) {
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

async function handleSubmit(event) {
  event.preventDefault();

  if (isSubmitting) {
    return;
  }

  const { form, submitButton, messageBox } = getFormElements();
  if (!form) {
    return;
  }

  clearMessage(messageBox);

  const rawData = {
    fullName: form.fullName.value,
    phone: form.phone.value,
    email: form.email.value,
    province: form.province.value,
    instagram: form.instagram.value,
    origin: form.origin.value,
    confirm: form.confirm.checked
  };

  const validationResult = validateParticipantForm(rawData);

  if (!validationResult.valid) {
    const firstErrorKey = Object.keys(validationResult.errors)[0];
    showMessage(messageBox, validationResult.errors[firstErrorKey], 'error');
    return;
  }

  const normalizedData = validationResult.data;
  const normalizedPhone = normalizedData.phone;

  isSubmitting = true;
  setSubmittingState(submitButton, true);

  try {
    const phoneExists = await checkPhoneExists(normalizedPhone);
    if (phoneExists) {
      showMessage(messageBox, 'Este número já possui uma participação registada.', 'error');
      return;
    }

    const emailExists = await checkEmailExists(normalizedData.email);
    if (emailExists) {
      showMessage(messageBox, 'Este email já possui uma participação registada.', 'error');
      return;
    }

    await saveParticipant(normalizedPhone, normalizedData);

    showMessage(messageBox, 'Participação registada com sucesso!', 'success');
    form.reset();
  } catch (error) {
    showMessage(messageBox, 'Ocorreu um erro ao registar a participação. Tente novamente.', 'error');
  } finally {
    isSubmitting = false;
    setSubmittingState(submitButton, false);
  }
}

export function initSubmitForm() {
  const { form } = getFormElements();
  if (!form) {
    return;
  }
  form.addEventListener('submit', handleSubmit);
}

initSubmitForm();
