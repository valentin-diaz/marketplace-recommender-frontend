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
</script>
<template>
    <div class="flex items-center justify-center">
        <NavigationMenu>
            <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
                <NavigationMenuContent>
                <NavigationMenuLink>Categoría</NavigationMenuLink>
                <NavigationMenuLink>Categoría</NavigationMenuLink>
                <NavigationMenuLink>Categoría</NavigationMenuLink>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
                <a href="/docs">Vender</a>
                </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
                <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
                <a href="/docs">Recomendaciones</a>
                </NavigationMenuLink>
            </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </div>
</template>