document.addEventListener("DOMContentLoaded", () => {
    // Custom cursor
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
  
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px"
        cursorFollower.style.top = e.clientY + "px"
      }, 100)
    })
  
    document.addEventListener("mousedown", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(0.6)"
    })
  
    document.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
    })
  
    // Hover effect on links and buttons
    const links = document.querySelectorAll("a, button")
  
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursor.style.backgroundColor = "transparent"
        cursor.style.border = "1px solid var(--primary)"
        cursorFollower.style.width = "40px"
        cursorFollower.style.height = "40px"
      })
  
      link.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)"
        cursor.style.backgroundColor = "var(--primary)"
        cursor.style.border = "none"
        cursorFollower.style.width = "30px"
        cursorFollower.style.height = "30px"
      })
    })
  
    // Header scroll effect
    const header = document.querySelector("header")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const navLinks = document.querySelector(".nav-links")
  
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  
    // Smooth scroll for navigation links
    const navItems = document.querySelectorAll(".nav-links a")
  
    navItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href")
  
        if (targetId.startsWith("#")) {
          e.preventDefault()
  
          const targetSection = document.querySelector(targetId)
  
          if (targetSection) {
            window.scrollTo({
              top: targetSection.offsetTop - 100,
              behavior: "smooth",
            })
          }
  
          // Close mobile menu if open
          menuToggle.classList.remove("active")
          navLinks.classList.remove("active")
        }
      })
    })
  
    // Active navigation link on scroll
    const sections = document.querySelectorAll("section")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href") === "#" + current) {
          item.classList.add("active")
        }
      })
    })
  
    // Testimonial slider
    const testimonialCards = document.querySelectorAll(".testimonial-card")
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.querySelector(".prev")
    const nextBtn = document.querySelector(".next")
    let currentIndex = 1 // Start with the middle card active
  
    function showTestimonial(index) {
      testimonialCards.forEach((card) => card.classList.remove("active"))
      dots.forEach((dot) => dot.classList.remove("active"))
  
      testimonialCards[index].classList.add("active")
      dots[index].classList.add("active")
      currentIndex = index
    }
  
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length
      showTestimonial(currentIndex)
    })
  
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % testimonialCards.length
      showTestimonial(currentIndex)
    })
  
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showTestimonial(index)
      })
    })
  
    // Auto rotate testimonials
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonialCards.length
      showTestimonial(currentIndex)
    }, 5000)
  
    // Form submission
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const submitBtn = contactForm.querySelector(".submit-btn")
        const originalText = submitBtn.innerHTML
  
        submitBtn.innerHTML = "Sending..."
        submitBtn.disabled = true
  
        // Simulate form submission
        setTimeout(() => {
          submitBtn.innerHTML = "Message Sent!"
          submitBtn.style.background = "linear-gradient(135deg, #06d6a0, #1b9aaa)"
  
          // Reset form
          contactForm.reset()
  
          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.innerHTML = originalText
            submitBtn.style.background = ""
            submitBtn.disabled = false
          }, 3000)
        }, 2000)
      })
    }
  
    // Book now button animation
    const bookNowBtn = document.querySelector(".book-now-btn")
  
    if (bookNowBtn) {
      bookNowBtn.addEventListener("click", function () {
        this.innerHTML = "Booking..."
        this.disabled = true
  
        // Simulate booking process
        setTimeout(() => {
          this.innerHTML = "Booked Successfully!"
          this.style.background = "linear-gradient(135deg, #06d6a0, #1b9aaa)"
  
          // Reset button after 3 seconds
          setTimeout(() => {
            this.innerHTML = "Book Now"
            this.style.background = ""
            this.disabled = false
          }, 3000)
        }, 2000)
      })
    }
  
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll(".service-card, .feature-card, .testimonial-card, .why-us-feature")
  
    function reveal() {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementTop < windowHeight - 100) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Set initial state for reveal elements
    revealElements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(50px)"
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    })
  
    window.addEventListener("scroll", reveal)
  
    // Call reveal once on load
    reveal()
  })
  
  