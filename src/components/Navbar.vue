<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="flex items-center justify-center">
        <NavigationMenu>
            <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
                    <RouterLink to="/explore">Recomendaciones</RouterLink>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
                    <RouterLink to="/catalog">Libros</RouterLink>
                </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
                <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
                    <RouterLink to="/vender">Referencias</RouterLink>
                </NavigationMenuLink>
            </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </div>
</template>