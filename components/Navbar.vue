<template>
  <div class="navbar-container fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block" :class="{ 'over-dark': isOverDarkSection }">
    <div class="navbar-background bg-white/10 backdrop-blur-lg rounded-3xl p-2 shadow-2xl border border-white/20">
      <div class="flex items-center space-x-2">
        <NuxtLink
          to="/"
          class="dock-item group relative"
          :class="$route.path === '/' ? 'active' : ''"
        >
          <div class="icon-container">
            <Icon name="solar:home-bold-duotone" size="2em" :class="getIconClass('/', isOverDarkSection)" />
          </div>
          <div class="tooltip">{{ $t('nav.home') }}</div>
        </NuxtLink>

        <NuxtLink
          to="/portfolio"
          class="dock-item group relative"
          :class="$route.path === '/portfolio' ? 'active' : ''"
        >
          <div class="icon-container">
            <Icon name="solar:folder-bold-duotone" size="2em" :class="getIconClass('/portfolio', isOverDarkSection)" />
          </div>
          <div class="tooltip">{{ $t('nav.portfolio') }}</div>
        </NuxtLink>

        <NuxtLink
          to="/about"
          class="dock-item group relative"
          :class="$route.path === '/about' ? 'active' : ''"
        >
          <div class="icon-container">
            <Icon name="solar:user-bold-duotone" size="2em" :class="getIconClass('/about', isOverDarkSection)" />
          </div>
          <div class="tooltip">{{ $t('nav.about') }}</div>
        </NuxtLink>

        <NuxtLink
          to="/contact"
          class="dock-item group relative"
          :class="$route.path === '/contact' ? 'active' : ''"
        >
          <div class="icon-container">
            <Icon name="solar:letter-bold-duotone" size="2em" :class="getIconClass('/contact', isOverDarkSection)" />
          </div>
          <div class="tooltip">{{ $t('nav.contact') }}</div>
        </NuxtLink>
      </div>
    </div>
  </div>

  <div class="navbar-container-mobile fixed bottom-6 left-6 right-6 z-50 md:hidden" :class="{ 'over-dark': isOverDarkSection }">
    <div class="navbar-background bg-white/10 backdrop-blur-lg rounded-3xl p-3 shadow-2xl border border-white/20">
      <div class="flex justify-around items-center">
        <NuxtLink
          to="/"
          class="mobile-nav-item flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200"
          :class="$route.path === '/' ? 'bg-[#87AFB1]/20' : 'hover:bg-white/20'"
        >
          <Icon name="solar:home-bold-duotone" size="2em" :class="getIconClass('/', isOverDarkSection)" />
          <span class="text-xs mt-1" :class="getTextClass('/', isOverDarkSection)">{{ $t('nav.home') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/portfolio"
          class="mobile-nav-item flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200"
          :class="$route.path === '/portfolio' ? 'bg-[#87AFB1]/20' : 'hover:bg-white/20'"
        >
          <Icon name="solar:folder-bold-duotone" size="2em" :class="getIconClass('/portfolio', isOverDarkSection)" />
          <span class="text-xs mt-1" :class="getTextClass('/portfolio', isOverDarkSection)">{{ $t('nav.portfolio') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/about"
          class="mobile-nav-item flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200"
          :class="$route.path === '/about' ? 'bg-[#87AFB1]/20' : 'hover:bg-white/20'"
        >
          <Icon name="solar:user-bold-duotone" size="2em" :class="getIconClass('/about', isOverDarkSection)" />
          <span class="text-xs mt-1" :class="getTextClass('/about', isOverDarkSection)">{{ $t('nav.about') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/contact"
          class="mobile-nav-item flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200"
          :class="$route.path === '/contact' ? 'bg-[#87AFB1]/20' : 'hover:bg-white/20'"
        >
          <Icon name="solar:letter-bold-duotone" size="2em" :class="getIconClass('/contact', isOverDarkSection)" />
          <span class="text-xs mt-1" :class="getTextClass('/contact', isOverDarkSection)">{{ $t('nav.contact') }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>

  <ClientOnly>
    <div class="fixed top-4 right-4 md:top-6 md:right-6" style="z-index: 9999;">
      <LanguageToggle :is-over-dark-section="false" />
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const route = useRoute()
const { t } = useI18n()
const isOverDarkSection = ref(false)
const isScrolled = ref(false)

const isHomePage = computed(() => route.path === '/')

const checkNavbarPosition = () => {
  // Use nextTick to ensure DOM is updated
  nextTick(() => {
    const navbarMobile = document.querySelector('.navbar-container-mobile')
    const navbarDesktop = document.querySelector('.navbar-container')

    const isDesktop = window.innerWidth >= 768
    const navbar = isDesktop ? navbarDesktop : navbarMobile

    if (!navbar) {
      // Retry after a short delay if navbar elements aren't found
      setTimeout(checkNavbarPosition, 100)
      return
    }

    const navbarRect = navbar.getBoundingClientRect()
    const navbarBottom = navbarRect.bottom
    const navbarTop = navbarRect.top

    const darkSections = document.querySelectorAll('.bg-dark')
    if (darkSections.length === 0) {
      isOverDarkSection.value = false
      return
    }

    let overlapping = false
    darkSections.forEach(section => {
      const sectionRect = section.getBoundingClientRect()

      if (navbarTop < sectionRect.bottom && navbarBottom > sectionRect.top) {
        overlapping = true
      }
    })

    isOverDarkSection.value = overlapping
  })
}

const checkScrollPosition = () => {
  isScrolled.value = window.scrollY > 50
}

const getIconClass = (routePath, overDark) => {
  const isActive = route.path === routePath

  if (isActive) {
    return 'text-[#87AFB1]'
  }

  return 'text-white group-hover:text-[#87AFB1]'
}

const getTextClass = (routePath, overDark) => {
  const isActive = route.path === routePath

  if (isActive) {
    return 'text-[#87AFB1]'
  }

  return 'text-white'
}

onMounted(() => {
  // Use nextTick to ensure components are mounted before checking position
  nextTick(() => {
    checkNavbarPosition()
    checkScrollPosition()
    window.addEventListener('scroll', () => {
      checkNavbarPosition()
      checkScrollPosition()
    })
    window.addEventListener('resize', checkNavbarPosition)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkNavbarPosition)
  window.removeEventListener('resize', checkNavbarPosition)
})
</script>

<style scoped>
.dock-item {
  @apply relative p-1 rounded-xl transition-all duration-300 ease-out;
}

.dock-item:hover {
  @apply transform scale-125;
}

.dock-item.active .icon-container {
  @apply bg-[#87AFB1]/20 backdrop-blur-sm;
}

.icon-container {
  @apply p-2 rounded-lg transition-all duration-200 flex items-center justify-center;
}

.dock-item:hover .icon-container {
  @apply bg-white/20 backdrop-blur-sm;
}

.tooltip {
  @apply absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 pointer-events-none transition-opacity duration-200;
}

.dock-item:hover .tooltip {
  @apply opacity-100;
}

.mobile-nav-item {
  @apply min-w-[60px];
}

.navbar-container,
.navbar-container-mobile {
  transition: all 0.3s ease-in-out;
  opacity: 1;
  visibility: visible;
}

.navbar-container .navbar-background,
.navbar-container-mobile .navbar-background {
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
}

.navbar-container.over-dark .navbar-background,
.navbar-container-mobile.over-dark .navbar-background {
  @apply bg-black/20 border-black/30;
}

.dock-item .iconify,
.mobile-nav-item .iconify,
.mobile-nav-item span {
  transition: color 0.3s ease-in-out;
}

.navbar-container.over-dark .tooltip {
  @apply bg-white/90 text-black;
}

.topbar-background {
  transition: background-color 0.5s ease-in-out, border-color 0.5s ease-in-out, color 0.5s ease-in-out;
}
</style>