<template>
  <div class="language-toggle relative">
    <button
      @click="toggleDropdown"
      class="group flex items-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 ease-out shadow-sm border"
      :class="isOverDarkSection
        ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:shadow-lg hover:scale-105'
        : 'bg-white/80 border-gray-200/50 text-gray-700 hover:bg-white hover:shadow-md hover:scale-105'"
    >
      <span class="text-xl group-hover:scale-110 transition-transform duration-200">{{ currentLocale.flag }}</span>
      <Icon name="solar:alt-arrow-down-bold" size="0.9em"
            :class="{ 'rotate-180': isOpen }"
            class="transition-all duration-300 group-hover:text-[#87AFB1]" />
    </button>

    <Transition name="dropdown" appear>
      <div
        v-if="isOpen"
        class="absolute top-full right-0 mt-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 py-3 min-w-[180px] overflow-hidden"
        style="z-index: 999999;"
        @click.stop
      >
        <div class="px-3 pb-2 mb-2 border-b border-gray-100">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Select Language</p>
        </div>
        <button
          v-for="(locale, index) in availableLocales"
          :key="locale.code"
          @click="switchLanguage(locale.code)"
          class="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-orange-50 transition-all duration-200 language-item relative group"
          :class="{ 'bg-orange-50 font-semibold text-[#87AFB1]': locale.code === $i18n.locale }"
          :style="{ animationDelay: `${index * 80}ms` }"
        >
          <div class="absolute left-0 w-1 h-full bg-[#87AFB1] scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center"
               :class="{ 'scale-y-100': locale.code === $i18n.locale }"></div>
          <span class="text-xl group-hover:scale-110 transition-transform duration-200">{{ locale.flag }}</span>
          <span class="text-gray-700 group-hover:text-gray-900 transition-colors duration-200"
                :class="{ 'text-[#87AFB1]': locale.code === $i18n.locale }">{{ locale.name }}</span>
          <Icon v-if="locale.code === $i18n.locale" name="solar:check-circle-bold"
                class="ml-auto text-[#87AFB1] text-sm" />
        </button>
      </div>
    </Transition>
  </div>

  <div
    v-if="isOpen"
    @click="closeDropdown"
    class="fixed inset-0"
    style="z-index: 999998;"
  ></div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOverDarkSection: {
    type: Boolean,
    default: false
  }
})

const { locale, locales, setLocale } = useI18n()

const isOpen = ref(false)

const availableLocales = computed(() => {
  return locales.value.map(locale => ({
    code: locale.code,
    name: locale.name,
    flag: locale.flag
  }))
})

const currentLocale = computed(() => {
  return availableLocales.value.find(l => l.code === locale.value) || availableLocales.value[0]
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const switchLanguage = async (localeCode) => {
  await setLocale(localeCode)
  closeDropdown()
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.language-toggle')) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.language-toggle {
  user-select: none;
}

.dropdown-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dropdown-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.6, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-15px) scale(0.9);
  filter: blur(4px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
  filter: blur(2px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.language-item {
  animation: slideInLanguage 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
  transform: translateX(15px);
}

@keyframes slideInLanguage {
  0% {
    opacity: 0;
    transform: translateX(15px) scale(0.95);
  }
  60% {
    transform: translateX(-2px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.language-item:hover {
  transform: translateX(3px) scale(1.02);
  background: linear-gradient(135deg, rgba(249, 115, 21, 0.05), rgba(251, 146, 60, 0.1));
}

.language-toggle button {
  position: relative;
  overflow: hidden;
}

.language-toggle button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.language-toggle button:hover::before {
  left: 100%;
}

.language-toggle button:active {
  transform: scale(0.95);
}

@media (prefers-reduced-motion: reduce) {
  .language-item {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: opacity 0.2s ease;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: none;
    filter: none;
  }
}
</style>