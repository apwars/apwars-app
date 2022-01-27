<template>
<v-container>
    <v-row>
        <v-col>
            <Title text="Packs to play" subtitle="We try to be transparent, just like Blockchain, here is all the data you need to make your decisions." />
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <div class="buttons-container">
                <div class="race-button">
            <Button text="Humans" :type="selectedRace === 1 ? 'wprimary' : 'wsecondary'" :handleClick="() => selectRace(1)" isBlock />
                </div>
                <div class="race-button">
                <Button text="Orcs" :type="selectedRace === 2 ? 'wprimary' : 'wsecondary'" :handleClick="() => selectRace(2)" isBlock />
                    </div>
                <div class="race-button">
                    <Button text="Undead" :type="selectedRace === 3 ? 'wprimary' : 'wsecondary'" :handleClick="() => selectRace(3)" isBlock />
                        </div>
                <div class="race-button">
                        <Button text="Elves" :type="selectedRace === 4 ? 'wprimary' : 'wsecondary'" :handleClick="() => selectRace(4)" isBlock />
                            </div>
            </div>
        </v-col>
    </v-row>
    <v-row>
        <v-col col="12" md="10" offset-md="1">
            <PackCard class="pack" v-for="pack in packs" :key="pack.id" :pack="pack" />
        </v-col>
    </v-row>
</v-container>
    
</template>
<script>
import { HUMANS, ORCS, UNDEAD, ELVES } from "@/data/UnitPacks";
import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import PackCard from "@/lib/components/ui/PackCard";
export default {
    components: { Title, PackCard, Button },
    computed: {
        packsData() {
            return [].concat(HUMANS, ORCS, UNDEAD, ELVES);
        },
        packs() {
            return this.packsData.filter(p => p.race === this.selectedRace);
        }
    },
    data() {
        return {
            selectedRace: 1
        }
    },
    methods: {
        selectRace(raceId) {
            this.selectedRace = raceId;
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
.buttons-container {
    display: flex;
    justify-content: space-evenly;
}
.race-button {
    width: 180px;
}
</style>