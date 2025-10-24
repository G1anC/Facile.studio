<template>
  <div class="w-full min-h-screen bg-transparent text-white bg-grid relative overflow-hidden">
    <Navbar />

    <main class="relative z-10 p-5 md:p-10 pb-40 md:pb-40 pt-36 md:pt-40">
      <section class="max-w-6xl mx-auto mb-16">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-3 bg-[#87AFB1]/10 rounded-full px-6 py-2 mb-6 fade-in-up">
            <Icon name="solar:letter-bold-duotone" class="text-[#87AFB1]" size="1.2em" />
            <span class="text-[#87AFB1] font-medium">{{ t('nav.contact') }}</span>
          </div>

          <h1 class="text-5xl md:text-7xl font-bold mb-6 font-gambarino text-white fade-in-up" style="animation-delay: 0.2s;">{{ t('contact.title') }}</h1>
          <p class="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed fade-in-up" style="animation-delay: 0.4s;">
            {{ t('contact.subtitle') }}
          </p>
        </div>
      </section>

      <section class="max-w-6xl mx-auto mb-20">
        <div class="flex justify-center">

          <div class="contact-card group cursor-pointer max-w-md" @click="openEmail">
            <div class="contact-card-inner">
              <div class="flex flex-col items-center text-center">
                <div class="icon-container mb-6">
                  <Icon name="mdi:email-outline" size="3em" class="text-[#87AFB1]" />
                </div>
                <h3 class="text-2xl font-bold mb-3 font-gambarino text-white">{{ t('contact.methods.email.title') }}</h3>
                <p class="text-gray-200 mb-4">{{ t('contact.methods.email.description') }}</p>
                <div class="email-address">
                  <span class="text-[#87AFB1] font-medium">contact@facile.studio</span>
                </div>
                <div class="mt-4 flex items-center text-sm text-gray-200">
                  <Icon name="mdi:clock-outline" class="mr-2" />
                  {{ t('contact.quick_contact.response_time') }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section class="max-w-4xl mx-auto">
        <div class="bg-dark rounded-3xl p-8 md:p-12 text-light relative overflow-hidden">
          <div class="absolute inset-0 opacity-15 overflow-hidden">
            <div v-for="i in 150" :key="i"
                 class="absolute bg-white rounded-full"
                 :class="[getDotSize(i), getDotAnimation(i)]"
                 :style="getDotStyle(i)"></div>
          </div>

          <div class="relative z-10">
            <div class="text-center mb-8">
              <h2 class="text-3xl md:text-4xl font-bold mb-4 font-gambarino">{{ t('contact.quick_contact.title') }}</h2>
              <p class="text-lg md:text-xl opacity-90 mb-8">
                {{ t('contact.quick_contact.subtitle') }}
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <button @click="openQuickEmail"
                      class="quick-action-btn bg-[#87AFB1] hover:bg-[#ea580c] text-white">
                <Icon name="mdi:rocket-launch" size="1.5em" />
                <span>{{ t('contact.quick_contact.email_button') }}</span>
                <Icon name="mdi:arrow-right" />
              </button>

              <button @click="scheduleCall"
                      class="quick-action-btn bg-white/10 hover:bg-white/20 text-white border border-white/20">
                <Icon name="mdi:calendar-clock" size="1.5em" />
                <span>{{ t('contact.quick_contact.schedule_button') }}</span>
                <Icon name="mdi:external-link" />
              </button>
            </div>

            <div class="mt-8 text-center">
              <div class="inline-flex items-center bg-white/10 rounded-full px-4 py-2">
                <div class="relative mr-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full relative z-10"></div>
                  <div class="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
                  <div class="absolute inset-0 w-2 h-2 bg-green-300 rounded-full halo-pulse"></div>
                </div>
                <span class="text-sm">{{ t('contact.quick_contact.response_time') }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-4xl mx-auto mt-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 font-gambarino text-white">{{ t('contact.faq.title') }}</h2>
          <p class="text-lg text-gray-200">{{ t('contact.faq.title') }}</p>
        </div>

        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index"
               class="faq-item rounded-2xl overflow-hidden">
            <button @click="toggleFaq(index)"
                    class="w-full p-6 text-left flex justify-between items-center transition-colors">
              <span class="font-medium text-lg text-white">{{ faq.question }}</span>
              <Icon name="mdi:chevron-down"
                    :class="['transition-transform text-white', openFaq === index ? 'rotate-180' : '']" />
            </button>
            <transition name="faq-unfold">
              <div v-if="openFaq === index" class="faq-content">
                <div class="px-8 py-6">
                  <p class="text-gray-200 leading-relaxed">{{ faq.answer }}</p>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const { t } = useI18n()

useHead({
  title: t('meta.contact.title'),
  meta: [
    { hid: 'description', name: 'description', content: t('meta.contact.description') },
    { hid: 'keywords', name: 'keywords', content: 'contact, get in touch, web development contact, hire web developer, project inquiry' },
    { hid: 'author', name: 'author', content: 'Yann Thevenin' },
    { hid: 'og:title', property: 'og:title', content: t('meta.contact.title') },
    { hid: 'og:description', property: 'og:description', content: t('meta.contact.description') },
    { hid: 'og:image', property: 'og:image', content: 'https://facile.studio/og.png' },
    { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
    { hid: 'og:image:height', property: 'og:image:height', content: '630' },
    { hid: 'og:url', property: 'og:url', content: 'https://facile.studio/contact' },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
    { hid: 'twitter:title', name: 'twitter:title', content: t('meta.contact.title') },
    { hid: 'twitter:description', name: 'twitter:description', content: t('meta.contact.description') },
    { hid: 'twitter:image', name: 'twitter:image', content: 'https://facile.studio/og.png' }
  ]
})

const openFaq = ref(null)

const faqs = [
  {
    question: t('contact.faq.q1.question'),
    answer: t('contact.faq.q1.answer')
  },
  {
    question: t('contact.faq.q2.question'),
    answer: t('contact.faq.q2.answer')
  },
  {
    question: t('contact.faq.q3.question'),
    answer: t('contact.faq.q3.answer')
  },
  {
    question: t('contact.faq.q4.question'),
    answer: t('contact.faq.q4.answer')
  }
]

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? null : index
}

function openEmail() {
  window.location.href = 'mailto:contact@facile.studio?subject=New Project Inquiry'
}

function openQuickEmail() {
  const subject = encodeURIComponent('Let\'s Start a Project Together!')
  const body = encodeURIComponent('Hi Yann,\n\nI\'d like to discuss a project with you.\n\nProject type: \nTimeline: \nBudget range: \n\nLooking forward to hearing from you!\n\nBest regards,')
  window.location.href = `mailto:contact@facile.studio?subject=${subject}&body=${body}`
}

function scheduleCall() {
  window.open('mailto:contact@facile.studio?subject=Schedule a Call&body=Hi Yann,%0A%0AI\'d like to schedule a call to discuss my project.%0A%0APreferred time:%0AProject details:%0A%0AThanks!', '_blank')
}

function getDotSize(index) {
  const rand = (index * 0.618) % 1
  if (rand > 0.8) return 'w-3 h-3'
  if (rand > 0.6) return 'w-2 h-2'
  if (rand > 0.3) return 'w-1.5 h-1.5'
  return 'w-1 h-1'
}

function getDotAnimation(index) {
  return 'dot-rain'
}

function getDotStyle(index) {
  const x = ((index * 17) % 97)
  const startY = -10 - ((index * 19) % 30)
  const delay = ((index * 0.2) % 8)
  const duration = 3 + (((index * 13) % 20) * 0.2)
  const opacity = 0.4 + (((index * 11) % 40) * 0.01)

  return {
    left: `${x}%`,
    top: `${startY}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity: opacity
  }
}
</script>

<style scoped>
.contact-card {
  @apply rounded-2xl p-6 transition-all duration-300 hover:shadow-lg;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.contact-card:hover {
  @apply transform -translate-y-2;
  box-shadow: 0 20px 40px rgba(135, 175, 177, 0.3);
  border-color: rgba(135, 175, 177, 0.4);
}

.contact-card-inner {
  @apply h-full;
}

.icon-container {
  @apply w-20 h-20 rounded-full flex items-center justify-center transition-colors;
  background: rgba(135, 175, 177, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.contact-card:hover .icon-container {
  background: rgba(135, 175, 177, 0.2);
}

.quick-action-btn {
  @apply flex items-center justify-center gap-3 p-4 rounded-xl font-medium transition-all duration-200 hover:transform hover:scale-105;
}

.faq-item {
  @apply transition-all duration-300;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.faq-item:hover {
  box-shadow: 0 10px 30px rgba(135, 175, 177, 0.2);
  border-color: rgba(135, 175, 177, 0.3);
}

.faq-item button:hover {
  background: rgba(135, 175, 177, 0.1);
}

.faq-content {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.faq-unfold-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.faq-unfold-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.faq-unfold-enter-from {
  opacity: 0;
  transform: scaleY(0) translateY(-10px);
  max-height: 0;
}

.faq-unfold-enter-to {
  opacity: 1;
  transform: scaleY(1) translateY(0);
  max-height: 200px;
}

.faq-unfold-leave-from {
  opacity: 1;
  transform: scaleY(1) translateY(0);
  max-height: 200px;
}

.faq-unfold-leave-to {
  opacity: 0;
  transform: scaleY(0) translateY(-10px);
  max-height: 0;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.contact-card:nth-child(1) {
  animation: float 6s ease-in-out infinite;
}

.contact-card:nth-child(2) {
  animation: float 6s ease-in-out infinite 2s;
}

.contact-card:nth-child(3) {
  animation: float 6s ease-in-out infinite 4s;
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dot-rain {
  animation: dotRain infinite linear;
}

.halo-pulse {
  animation: haloPulse 2s infinite ease-in-out;
}

@keyframes dotRain {
  0% {
    transform: translateY(0px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(120vh);
    opacity: 0;
  }
}

@keyframes haloPulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(2.5);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}
</style>