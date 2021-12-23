<template>
<v-container>
    <v-row>
        <v-col>
            <Title text="Packs to play" subtitle="We try to be transparent, just like Blockchain, here is all the data you need to make your decisions." />
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <PackCard class="pack" v-for="pack in humanPacks" :key="pack.id" :pack="pack" />
        </v-col>
    </v-row>
</v-container>
    
</template>
<script>
import { HUMANS, ORCS } from "@/data/UnitPacks";
import Title from "@/lib/components/ui/Title";
import PackCard from "@/lib/components/ui/PackCard";
export default {
    components: { Title, PackCard },
    computed: {
        humanPacks() {
            return HUMANS;
        }
    }
}
</script>
<style lang="scss" scoped>
.pack {
    &:first-child {
        margin-top: 36px;
    }
    &:not(:first-child) {
        margin-top: 120px;
    }
}
</style>