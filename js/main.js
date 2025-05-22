/**
 * DevFiveM Portfolio - Main JavaScript
 * Author: DevFiveM
 * Version: 2.0 - Dark Galaxy Theme
 */

document.addEventListener("DOMContentLoaded", () => {
  // Create stars for galaxy background
  createStars()

  // Preloader
  const preloader = document.querySelector(".preloader")

  window.addEventListener("load", () => {
    preloader.classList.add("hide")

    // Animate skill bars after preloader is hidden
    setTimeout(animateSkillBars, 500)
  })

  // Custom Cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    cursorFollower.style.left = e.clientX + "px"
    cursorFollower.style.top = e.clientY + "px"
  })

  document.addEventListener("mousedown", () => {
    cursor.style.width = "8px"
    cursor.style.height = "8px"
    cursorFollower.style.width = "30px"
    cursorFollower.style.height = "30px"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.width = "10px"
    cursor.style.height = "10px"
    cursorFollower.style.width = "40px"
    cursorFollower.style.height = "40px"
  })

  // Add hover effect to links and buttons
  const links = document.querySelectorAll("a, button, .filter-btn, .dot")

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.width = "0"
      cursor.style.height = "0"
      cursorFollower.style.width = "50px"
      cursorFollower.style.height = "50px"
      cursorFollower.style.borderColor = "rgba(142, 68, 173, 0.5)"
      cursorFollower.style.backgroundColor = "rgba(142, 68, 173, 0.1)"
    })

    link.addEventListener("mouseleave", () => {
      cursor.style.width = "10px"
      cursor.style.height = "10px"
      cursorFollower.style.width = "40px"
      cursorFollower.style.height = "40px"
      cursorFollower.style.borderColor = "var(--primary-color)"
      cursorFollower.style.backgroundColor = "transparent"
    })
  })

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-menu ul li a")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Active link on scroll
  const sections = document.querySelectorAll("section")

  function setActiveLink() {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", setActiveLink)

  // Typing Animation
  const typedTextElement = document.querySelector(".typed-text")

  if (typedTextElement) {
    const texts = ["Desarrollador de Scripts", "Creador de Servidores", "Diseñador UI", "Desarrollador Web"]
    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    function type() {
      const currentText = texts[textIndex]

      if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1)
        charIndex--
        typingSpeed = 50
      } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1)
        charIndex++
        typingSpeed = 100
      }

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true
        typingSpeed = 1000 // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
        typingSpeed = 500 // Pause before typing next
      }

      setTimeout(type, typingSpeed)
    }

    setTimeout(type, 1000)
  }

  // Animate Skill Bars
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")

    skillBars.forEach((bar) => {
      let progress = bar.getAttribute("data-progress")

      switch (bar.parentElement.querySelector(".skill-title").textContent) {
        case "Lua":
          progress = "70"
          break
        case "ESX Framework":
          progress = "65"
          break
        case "QBCore Framework":
          progress = "60"
          break
        case "NUI (HTML/CSS/JS)":
          progress = "70"
          break
        case "HTML/CSS":
          progress = "75"
          break
        case "JavaScript":
          progress = "65"
          break
        case "PHP":
          progress = "55"
          break
        case "MySQL":
          progress = "60"
          break
      }

      bar.style.width = progress + "%"
    })
  }

  // Portfolio Filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      portfolioItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          }, 100)
        } else {
          item.style.opacity = "0"
          item.style.transform = "translateY(20px)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Testimonial Slider
  const testimonialItems = document.querySelectorAll(".testimonial-item")
  const testimonialDots = document.querySelectorAll(".dot")
  const prevButton = document.querySelector(".testimonial-prev")
  const nextButton = document.querySelector(".testimonial-next")

  let currentIndex = 0

  function showTestimonial(index) {
    testimonialItems.forEach((item) => item.classList.remove("active"))
    testimonialDots.forEach((dot) => dot.classList.remove("active"))

    testimonialItems[index].classList.add("active")
    testimonialDots[index].classList.add("active")
    currentIndex = index
  }

  prevButton.addEventListener("click", () => {
    let index = currentIndex - 1
    if (index < 0) index = testimonialItems.length - 1
    showTestimonial(index)
  })

  nextButton.addEventListener("click", () => {
    let index = currentIndex + 1
    if (index >= testimonialItems.length) index = 0
    showTestimonial(index)
  })

  testimonialDots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const index = Number.parseInt(this.getAttribute("data-index"))
      showTestimonial(index)
    })
  })

  // Auto slide testimonials
  setInterval(() => {
    let index = currentIndex + 1
    if (index >= testimonialItems.length) index = 0
    showTestimonial(index)
  }, 5000)

  // Back to Top Button
  const backToTopButton = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }
  })

  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  })

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        e.preventDefault()

        window.scrollTo({
          top: target.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        })
      }
    })
  })

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm")
  const toast = document.getElementById("toast")
  const toastClose = document.querySelector(".toast-close")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Validate form (simple validation)
      if (!name || !email || !subject || !message) {
        showToast("Error", "Por favor completa todos los campos", "error")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showToast("Error", "Por favor ingresa un email válido", "error")
        return
      }

      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]')
      submitButton.disabled = true
      submitButton.innerHTML = "Enviando..."

      // Simulate API call with timeout
      setTimeout(() => {
        // Reset form
        contactForm.reset()

        // Reset button
        submitButton.disabled = false
        submitButton.innerHTML = "Enviar Mensaje"

        // Show success message
        showToast("¡Éxito!", "Tu mensaje ha sido enviado correctamente", "success")
      }, 2000)
    })
  }

  // Toast notification function
  function showToast(title, message, type = "success") {
    if (toast) {
      const toastTitle = toast.querySelector(".toast-title")
      const toastText = toast.querySelector(".toast-text")
      const toastIcon = toast.querySelector("i")

      // Set content
      toastTitle.textContent = title
      toastText.textContent = message

      // Set icon and color based on type
      if (type === "success") {
        toastIcon.className = "fas fa-check-circle"
        toastIcon.style.color = "var(--success-color)"
      } else if (type === "error") {
        toastIcon.className = "fas fa-exclamation-circle"
        toastIcon.style.color = "var(--danger-color)"
      }

      // Show toast
      toast.classList.add("show")

      // Hide toast after 5 seconds
      setTimeout(() => {
        toast.classList.remove("show")
      }, 5000)
    }
  }

  // Close toast on button click
  if (toastClose) {
    toastClose.addEventListener("click", () => {
      toast.classList.remove("show")
    })
  }

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear()

  // Create stars for galaxy background
  function createStars() {
    const starsContainer = document.createElement("div")
    starsContainer.classList.add("stars")
    document.body.appendChild(starsContainer)

    const starCount = 200

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div")
      star.classList.add("star")

      // Random position
      const x = Math.random() * 100
      const y = Math.random() * 100

      // Random size
      const size = Math.random() * 2 + 1

      // Random animation delay
      const delay = Math.random() * 5

      star.style.left = `${x}%`
      star.style.top = `${y}%`
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.animationDelay = `${delay}s`

      starsContainer.appendChild(star)
    }
  }
})
