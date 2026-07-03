<template>
  <nav class="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-8 py-4 flex justify-between items-center z-[100]">
    <router-link to="/home" class="flex flex-col items-center gap-1 group">
      <span class="material-icons" :class="$route.path.includes('/home') ? 'text-primary' : 'text-slate-400 group-hover:text-primary'">home</span>
      <span class="text-[10px] font-bold" :class="$route.path.includes('/home') ? 'text-primary' : 'text-slate-400 group-hover:text-primary'">Beranda</span>
    </router-link>
    
    <router-link to="/history" class="flex flex-col items-center gap-1 group">
      <span class="material-icons" :class="$route.path.includes('/history') ? 'text-primary' : 'text-slate-400 group-hover:text-primary'">history</span>
      <span class="text-[10px] font-medium" :class="$route.path.includes('/history') ? 'text-primary' : 'text-slate-400 group-hover:text-primary'">Riwayat</span>
    </router-link>
    

    
    <router-link to="/favorites" class="flex flex-col items-center gap-1 group">
      <span class="material-icons" :class="$route.path.includes('/favorites') ? 'text-primary' : 'text-slate-400 group-hover:text-primary'">favorite_border</span>
      <span class="text-[10px] font-medium" :class="$route.path.includes('/favorites') ? 'text-primary' : 'text-slate-400 group-hover:text-primary'">Favorit</span>
    </router-link>
    
    <router-link to="/profile" class="flex flex-col items-center gap-1 group">
      <span class="material-icons" :class="$route.path.includes('/profile') ? 'text-primary' : 'text-slate-400 group-hover:text-primary'">person_outline</span>
      <span class="text-[10px] font-medium" :class="$route.path.includes('/profile') ? 'text-primary' : 'text-slate-400 group-hover:text-primary'">Profil</span>
    </router-link>
  </nav>
</template>

<script setup>
</script>
