<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Separator from '../ui/separator/Separator.vue';

const props = defineProps<{
    trigger: string;
}>();
</script>

<template>
    <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
        <AccordionTrigger class="text-xl">{{ props.trigger }}</AccordionTrigger>
        <Separator class="mt-0 mb-2" />
        <AccordionContent>
            <slot />
        </AccordionContent>
        </AccordionItem>
    </Accordion>
</template>