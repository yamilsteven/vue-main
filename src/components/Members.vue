<template>
    <div>
        <h1>Proton Members</h1>
        <div v-bind:key="member.id" v-for="member in members">
            <h3>{{ member.name }}</h3>
            <h4>{{ member.email }}</h4>
        </div>
        {{members}}
    </div>
</template>

<script>
export default {
    name: "Members",
    props: ["members"]
}
</script>
