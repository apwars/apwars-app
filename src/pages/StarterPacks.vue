<template>
<v-container>
    <v-row>
        <v-col>
            <Title text="Packs to play" subtitle="We try to be transparent, just like Blockchain, here is all the data you need to make your decisions." />
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <PackCard class="mt-12" title="Warrior Pack" subtitle="Starter Pack" />
            <PackCard class="mt-12" variant="green" title="Conqueror Pack" subtitle="Starter Pack" />
            <PackCard class="mt-12" variant="red" title="Commander Pack" subtitle="Starter Pack" />
        </v-col>
    </v-row>
</v-container>
    
</template>
<script>
import Title from "@/lib/components/ui/Title";
import PackCard from "@/lib/components/ui/PackCard";
export default {
    components: { Title, PackCard }
}
</script>
<style lang="scss" scoped>

</style>