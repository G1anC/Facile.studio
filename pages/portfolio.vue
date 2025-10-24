<template>
  <div class="w-full min-h-screen bg-transparent text-white bg-grid relative overflow-hidden">
    <Navbar />

    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="i in 6" :key="'orb-' + i"
           class="absolute rounded-full bg-gradient-to-br from-[#87AFB1]/10 to-[#87AFB1]/3 blur-2xl"
           :class="getOrbSize(i)"
           :style="getOrbStyle(i)"></div>
    </div>

    <main class="relative z-10 p-5 md:p-10 pb-40 md:pb-40 pt-36 md:pt-40">

      <section class="max-w-7xl mx-auto mb-16">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-3 bg-[#87AFB1]/10 rounded-full px-6 py-2 mb-6 fade-in-up relative overflow-hidden">
            <div class="absolute inset-0 opacity-10 overflow-hidden">
              <div v-for="i in 30" :key="'pill-' + i"
                   class="absolute bg-[#87AFB1] rounded-full dot-rain"
                   :class="getPillDotSize(i)"
                   :style="getPillDotStyle(i)"></div>
            </div>
            <Icon name="solar:folder-bold-duotone" class="text-[#87AFB1] relative z-10" size="1.2em" />
            <span class="text-[#87AFB1] font-medium relative z-10">{{ t('nav.portfolio') }}</span>
          </div>

          <h1 class="text-5xl md:text-7xl font-bold mb-6 font-gambarino text-white fade-in-up" style="animation-delay: 0.2s;">
            {{ t('portfolio.title') }}
          </h1>

          <p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed fade-in-up" style="animation-delay: 0.4s;">
            {{ t('portfolio.subtitle') }}
          </p>
        </div>

      </section>

      <section class="max-w-7xl mx-auto">
        <div class="projects-container">
          <div v-for="(project, index) in projects" :key="project.id"
            class="flex flex-col project-card p-6 rounded-xl shadow-lg justify-between gap-4 stagger-animation"
            :style="{ animationDelay: `${0.2 + (index * 0.05)}s` }">

            <div>
              <Icon :name="project.icon" class="text-4xl text-center mb-3 text-[#87AFB1]" />
              <h2 class="text-3xl font-semibold mb-2 text-white">{{ project.title }}</h2>
              <p class="text-xl text-gray-200">{{ project.description }}</p>
            </div>
            <div class="mt-3">
              <h2 class="text-xl mb-3 text-gray-200 font-bold flex items-center gap-2">
                <Icon name="solar:code-square-bold-duotone" />
                Languages/Frameworks
              </h2>
              <div class="flex flex-wrap gap-3">
                <Badge v-for="tech in project.technologies" :key="tech">
                  {{ tech }}
                </Badge>
              </div>
            </div>
            <div class="mt-3">
              <h2 class="text-xl mb-3 text-gray-200 font-bold flex items-center gap-2">
                <Icon name="solar:link-bold-duotone" />
                Links
              </h2>
              <a :href="project.link" target="_blank"
                class="text-primary font-bold hover:underline flex items-center gap-2 group">
                <Icon name="solar:external-link-bold-duotone" class="group-hover:scale-110 transition-transform" />
                Visit Project
              </a>
            </div>
          </div>
        </div>

        <div class="text-center mt-20 fade-in-up" style="animation-delay: 0.3s;">
          <div class="bg-dark rounded-3xl p-8 md:p-12 text-light relative overflow-hidden">
            <div class="relative z-10">
              <h2 class="text-3xl md:text-4xl font-bold mb-4 font-gambarino">{{ t('portfolio.cta.title') }}</h2>
              <p class="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                {{ t('portfolio.cta.subtitle') }}
              </p>

              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <NuxtLink to="/contact"
                          class="cta-button primary group">
                  <Icon name="solar:letter-bold-duotone" size="1.2em" />
                  <span>{{ t('portfolio.cta.start_project') }}</span>
                  <Icon name="solar:arrow-right-bold" class="group-hover:translate-x-1 transition-transform" />
                </NuxtLink>

                <NuxtLink to="/about"
                          class="cta-button secondary group">
                  <Icon name="solar:user-bold-duotone" size="1.2em" />
                  <span>{{ t('portfolio.cta.view_more') }}</span>
                  <Icon name="solar:link-bold" class="group-hover:scale-110 transition-transform" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n()

useHead({
  title: t('meta.portfolio.title'),
  meta: [
    { name: 'description', content: t('meta.portfolio.description') },
    { name: 'keywords', content: 'portfolio, web projects, web applications, UI/UX design, mobile apps, digital solutions' },
    { name: 'author', content: 'Yann Thevenin' },
    { property: 'og:title', content: t('meta.portfolio.title') },
    { property: 'og:description', content: t('meta.portfolio.description') },
    { property: 'og:image', content: '/og.png' },
    { property: 'og:url', content: 'https://facile.studio/portfolio' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('meta.portfolio.title') },
    { name: 'twitter:description', content: t('meta.portfolio.description') },
    { name: 'twitter:image', content: '/og.png' }
  ]
})

const projects = [
  {
    id: 1,
    title: 'Disti.life',
    description: 'Disti.life is a comprehensive ERP solution tailored for distilleries, integrating advanced AI technologies to optimize production processes, manage inventory, and enhance decision-making through predictive analytics.',
    technologies: ['Vue.js', 'Node.js', 'AI', 'PostegreSQL', 'Docker'],
    icon: 'solar:bottle-bold-duotone',
    link: 'https://disti.life'
  },
  {
    id: 2,
    title: 'Solais Intranet',
    description: 'Solais is a robust intranet platform designed for a solar company, facilitating seamless internal communication, document management, and collaboration among teams, while providing tools for project tracking and resource allocation.',
    technologies: ['Angular', 'ExpressJS', 'MongoDB', 'Typescript'],
    icon: 'solar:sun-2-bold-duotone',
    link: 'https://solais.fr'
  },
  {
    id: 3,
    title: 'Marcel',
    description: 'Marcel is an innovative gamified organisation app that transforms task management into an engaging experience, encouraging productivity and teamwork through game-like elements and rewards, suitable for both personal and professional use.',
    technologies: ['Svelte', 'Pocketbase', 'Typescript', 'GoLang'],
    icon: 'solar:checklist-minimalistic-bold-duotone',
    link: 'https://marcel.my'
  },
  {
    id: 4,
    title: 'OffOn',
    description: 'OffOn is a dynamic e-commerce platform specialized in smartphone sales and repairs, combining a sleek, user-friendly interface with powerful inventory and service management tools to streamline operations and enhance the customer experience.',
    technologies: ['Vue', 'Nuxt', 'Directus', 'Typescript'],
    icon: 'solar:monitor-smartphone-bold-duotone',
    link: 'https://offon.store'
  },
  {
    id: 5,
    title: 'Brain.h',
    description: 'Brain.h is a lightweight C library designed for building and training neural networks, offering a straightforward API and efficient performance, making it an ideal choice for developers seeking simplicity and control in AI projects.',
    technologies: ['C'],
    icon: 'solar:database-bold-duotone',
    link: 'https://github.com/saravenpi/brain.h'
  }
]

function getOrbSize(index) {
  const sizes = ['w-32 h-32', 'w-48 h-48', 'w-24 h-24', 'w-40 h-40', 'w-28 h-28', 'w-36 h-36']
  return sizes[index % sizes.length]
}

function getOrbStyle(index) {
  const x = ((index * 31) % 90) + 5
  const y = ((index * 17) % 80) + 10
  const delay = (index * 1.2) % 5
  const duration = 10 + (index % 6)

  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

function getDotStyle(index) {
  const x = ((index * 23) % 95) + 2
  const y = ((index * 17) % 85) + 5
  const delay = (index * 0.1) % 3

  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`
  }
}

function getRainDotSize(index) {
  const rand = (index * 0.618) % 1
  if (rand > 0.8) return 'w-3 h-3'
  if (rand > 0.6) return 'w-2 h-2'
  if (rand > 0.3) return 'w-1.5 h-1.5'
  return 'w-1 h-1'
}

function getRainDotStyle(index) {
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

function getPillDotSize(index) {
  const rand = (index * 0.618) % 1
  if (rand > 0.7) return 'w-1.5 h-1.5'
  if (rand > 0.4) return 'w-1 h-1'
  return 'w-0.5 h-0.5'
}

function getPillDotStyle(index) {
  const x = ((index * 19) % 90) + 5
  const startY = -5 - ((index * 13) % 15)
  const delay = ((index * 0.3) % 4)
  const duration = 2 + (((index * 11) % 15) * 0.1)
  const opacity = 0.3 + (((index * 7) % 30) * 0.01)

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
.project-card {
  transition: transform 0.3s, opacity 0.5s, box-shadow 0.3s;
  opacity: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(135, 175, 177, 0.3);
  border-color: rgba(135, 175, 177, 0.4);
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.stagger-animation {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cta-button {
  @apply inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1;
}

.cta-button.primary {
  @apply bg-[#87AFB1] text-white hover:bg-[#ea580c] hover:shadow-[#87AFB1]/25;
}

.cta-button.secondary {
  @apply bg-white/10 border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/20;
}

.absolute.rounded-full {
  animation: float 15s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-30px) translateX(20px) rotate(90deg);
  }
  50% {
    transform: translateY(-15px) translateX(-15px) rotate(180deg);
  }
  75% {
    transform: translateY(-40px) translateX(10px) rotate(270deg);
  }
}

.projects-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  align-items: stretch;
}

.project-card {
  flex: 0 0 auto;
  width: 100%;
  max-width: 400px;
  min-width: 320px;
}

@media (min-width: 640px) {
  .project-card {
    width: calc(50% - 1rem);
  }
}

@media (min-width: 1024px) {
  .project-card {
    width: calc(33.333% - 1.333rem);
  }
}

@media (min-width: 1280px) {
  .project-card {
    width: calc(33.333% - 1.333rem);
    max-width: 380px;
  }
}

@media (max-width: 639px) {
  .projects-container {
    max-width: 500px;
    margin: 0 auto;
  }

  .project-card {
    width: 100%;
    max-width: none;
  }
}

.dot-rain {
  animation: dotRain infinite linear;
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
</style>