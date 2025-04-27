/**
 * FiveM Developer Portfolio - Reviews System
 * Author: DevFiveM
 * Version: 1.0
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const reviewsTrigger = document.getElementById("reviewsTrigger")
  const reviewsMenu = document.getElementById("reviewsMenu")
  const reviewsClose = document.getElementById("reviewsClose")
  const reviewsContainer = document.getElementById("reviewsContainer")
  const reviewForm = document.getElementById("reviewForm")
  const starRating = document.getElementById("starRating")
  const stars = starRating.querySelectorAll("i")
  const ratingText = starRating.querySelector(".rating-text")
  const toast = document.getElementById("toast")

  // Variables
  let selectedRating = 0

  // Abrir menú al pasar el mouse por el trigger
  reviewsTrigger.addEventListener("mouseenter", () => {
    reviewsMenu.classList.add("open")
  })

  // Cerrar menú al hacer clic en el botón de cierre
  reviewsClose.addEventListener("click", () => {
    reviewsMenu.classList.remove("open")
  })

  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!reviewsMenu.contains(e.target) && !reviewsTrigger.contains(e.target)) {
      reviewsMenu.classList.remove("open")
    }
  })

  // Inicializar la funcionalidad de calificación por estrellas
  stars.forEach((star) => {
    // Evento al pasar el mouse por encima
    star.addEventListener("mouseenter", function () {
      const rating = Number.parseInt(this.getAttribute("data-rating"))
      updateStars(rating)
      ratingText.textContent = `${rating} de 5`
    })

    // Evento al hacer clic
    star.addEventListener("click", function () {
      selectedRating = Number.parseInt(this.getAttribute("data-rating"))
      updateStars(selectedRating)
      ratingText.textContent = `${selectedRating} de 5`
    })
  })

  // Evento al quitar el mouse del contenedor de estrellas
  starRating.addEventListener("mouseleave", () => {
    updateStars(selectedRating)
    ratingText.textContent = selectedRating > 0 ? `${selectedRating} de 5` : "Selecciona una calificación"
  })

  // Función para actualizar las estrellas
  function updateStars(rating) {
    stars.forEach((star) => {
      const starRating = Number.parseInt(star.getAttribute("data-rating"))
      if (starRating <= rating) {
        star.className = "fas fa-star"
      } else {
        star.className = "far fa-star"
      }
    })
  }

  // Manejar envío del formulario de reseñas
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const nameInput = document.getElementById("reviewName")
    const commentInput = document.getElementById("reviewComment")

    const name = nameInput.value.trim()
    const comment = commentInput.value.trim()

    if (!name || !comment || selectedRating === 0) {
      showToast("Error", "Por favor completa todos los campos y selecciona una calificación", "error")
      return
    }

    // Crear nueva reseña
    const review = {
      id: Date.now(),
      name: name,
      rating: selectedRating,
      comment: comment,
      date: new Date().toLocaleDateString(),
    }

    // Guardar reseña
    saveReview(review)

    // Limpiar formulario
    nameInput.value = ""
    commentInput.value = ""
    selectedRating = 0
    updateStars(0)
    ratingText.textContent = "Selecciona una calificación"

    // Mostrar mensaje de éxito
    showToast("¡Éxito!", "Tu reseña ha sido publicada correctamente", "success")
  })

  // Función para guardar reseña
  function saveReview(review) {
    let reviews = []
    const savedReviews = localStorage.getItem("portfolio-reviews")

    if (savedReviews) {
      reviews = JSON.parse(savedReviews)
    }

    reviews.push(review)
    localStorage.setItem("portfolio-reviews", JSON.stringify(reviews))

    // Recargar reseñas
    loadReviews()
  }

  // Función para cargar reseñas
  function loadReviews() {
    const savedReviews = localStorage.getItem("portfolio-reviews")

    if (savedReviews) {
      const reviews = JSON.parse(savedReviews)

      if (reviews.length > 0) {
        reviewsContainer.innerHTML = reviews
          .map(
            (review) => `
                    <div class="review-card">
                        <div class="review-header">
                            <div>
                                <h5>${review.name}</h5>
                                <p class="review-date">${review.date}</p>
                            </div>
                            <div class="review-rating">
                                ${generateStars(review.rating)}
                            </div>
                        </div>
                        <p class="review-comment">${review.comment}</p>
                    </div>
                `,
          )
          .join("")
      } else {
        reviewsContainer.innerHTML = '<p class="no-reviews">Aún no hay reseñas. ¡Sé el primero en dejar tu opinión!</p>'
      }
    } else {
      reviewsContainer.innerHTML = '<p class="no-reviews">Aún no hay reseñas. ¡Sé el primero en dejar tu opinión!</p>'
    }
  }

  // Función para generar HTML de estrellas
  function generateStars(rating) {
    let stars = ""
    for (let i = 1; i <= 5; i++) {
      stars += `<i class="${i <= rating ? "fas" : "far"} fa-star"></i>`
    }
    return stars
  }

  // Función para mostrar notificación toast
  function showToast(title, message, type = "success") {
    const toastTitle = toast.querySelector(".toast-title")
    const toastText = toast.querySelector(".toast-text")
    const toastIcon = toast.querySelector("i:first-child")

    // Establecer contenido
    toastTitle.textContent = title
    toastText.textContent = message

    // Establecer icono y color según el tipo
    if (type === "success") {
      toastIcon.className = "fas fa-check-circle"
      toastIcon.style.color = "var(--success-color)"
    } else if (type === "error") {
      toastIcon.className = "fas fa-exclamation-circle"
      toastIcon.style.color = "var(--danger-color)"
    } else if (type === "info") {
      toastIcon.className = "fas fa-info-circle"
      toastIcon.style.color = "var(--info-color)"
    }

    // Mostrar toast
    toast.classList.add("show")

    // Ocultar toast después de 3 segundos
    setTimeout(() => {
      toast.classList.remove("show")
    }, 3000)
  }

  // Cargar reseñas al iniciar
  loadReviews()
})
