async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formMessage = document.getElementById('form-message');
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;

    if (!submitButton) return;

    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
            },
        });

        if (response.ok) {
            if (formMessage) {
                formMessage.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
                formMessage.className = 'p-4 rounded-lg text-center font-medium bg-green-100 text-green-800';
                formMessage.classList.remove('hidden');
            }
            form.reset();
        } else {
            throw new Error('Error al enviar el formulario');
        }
    } catch (_error) {
        if (formMessage) {
            formMessage.textContent = 'Hubo un error. Por favor, intenta de nuevo.';
            formMessage.className = 'p-4 rounded-lg text-center font-medium bg-red-100 text-red-800';
            formMessage.classList.remove('hidden');
        }
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage?.classList.add('hidden');
        }, 5000);
    }
}

export function initContactForm() {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (!form) return;
    form.addEventListener('submit', handleSubmit);
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}

// Re-initialize after View Transitions
document.addEventListener('astro:after-swap', initContactForm);
