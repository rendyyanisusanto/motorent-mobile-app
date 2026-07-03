<template>
  <div class="bg-white dark:bg-slate-900 font-display text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center relative z-0 flex-col overflow-hidden">
    <!-- Background Decoration -->
    <div class="fixed -z-10 top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-[10%] right-[15%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"></div>
    </div>

    <!-- Main Content -->
    <div class="w-full max-w-lg mx-auto flex-1 relative z-10 flex flex-col w-full">
      
      <!-- App Logo & Branding -->
      <div class="px-8 pt-12 pb-6 flex flex-col items-center shrink-0">
        <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
          <span class="material-icons-round text-white text-4xl">motorcycle</span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">MotoRent</h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Ride your way, anywhere.</p>
      </div>
      
      <div class="flex-1 w-full pb-8">
        <slot />
      </div>
    </div>

    <!-- Bottom Graphic/Pattern -->
    <div class="absolute bottom-0 left-0 w-full h-24 overflow-hidden pointer-events-none opacity-20 dark:opacity-10 z-0">
      <div class="w-full h-full bg-gradient-to-t from-primary to-transparent absolute inset-0 z-10"></div>
      <img alt="Motorcycle Background" class="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO9QpCOloMlkW-YXBkJplEuKNTJiCMQGoofM45t-vP3bX_Ox62DxsNQh94_ae5UKvJZ0aodcN4MWpDkUR0QYnBcpUG88920W5fA7ohbVtJ8WBnpntGyeDgHWn-OKAhH4S4frjHqL5Q4CzUw3geCHEgJHcLjJ9NGQEEa3IuNUcZuqEYujcnaPaRrc9z8p_Hm9bG4XhjHIaHQV5kdvuvb0LB8F3r_RfEWoSxKx8dRpPIAoqwdY7IJk5eKdQ5uZn3HlxaulN5nUu1PrCu"/>
    </div>
  </div>
</template>

<script setup>
</script>
