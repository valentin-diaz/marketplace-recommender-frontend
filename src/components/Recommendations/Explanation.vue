<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const props = defineProps<{
    trigger: string;
}>();
</script>

<template>
    <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
        <AccordionTrigger class="text-xl">{{ props.trigger }}</AccordionTrigger>
        <AccordionContent>
            <slot />
        </AccordionContent>
        </AccordionItem>
    </Accordion>
</template>