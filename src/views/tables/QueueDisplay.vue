<template>
    <section class="bg-[#002ea1] text-white py-[100px] px-[150px]">
        <div class="flex items-start justify-between mb-32">
            <h1 class="text-[84px]">Calling the Shots</h1>
            <img src="@/assets/ibm-logo-black-and-white.png" class="mt-4 h-[82px] w-auto" />
        </div>

        <div class="mb-16">
            <h2 class="font-bold text-[60px] mb-[24px]">Next up</h2>
            <p class="text-4xl text-[60px] italic">Please check in with IBM staff</p>
        </div>

        <div class="flex flex-col space-y-4 mt-[70px]">
            <h3 class="font-light text-[84px] text-[#ffdb50]">Firstname X.</h3>
            <h3 class="font-light text-[84px] text-[#ffdb50]">Firstnamy Y.</h3>
        </div>
    </section>

    <section class="py-[100px] px-[150px]">
        <h2 class="font-bold text-[60px] text-[#002ea1] mb-8">On deck</h2>

        <div class="flex flex-col space-y-4">
            <h3 class="font-light text-[84px]">Firstname X.</h3>
            <h3 class="font-light text-[84px]">Firstnamy Y.</h3>
            <h3 class="font-light text-[84px]">Firstname X.</h3>
            <h3 class="font-light text-[84px]">Firstnamy Y.</h3>
            <h3 class="font-light text-[84px]">Firstname X.</h3>
            <h3 class="font-light text-[84px]">Firstnamy Y.</h3>
            <h3 class="font-light text-[84px]">Firstname X.</h3>
            <h3 class="font-light text-[84px]">Firstnamy Y.</h3>
            <h3 class="font-light text-[84px]">Firstname X.</h3>
            <h3 class="font-light text-[84px]">Firstnamy Y.</h3>
            <h3 class="font-light text-[84px]">Firstname X.</h3>
            <h3 class="font-light text-[84px]">Firstnamy Y.</h3>
            <h3 class="font-light text-[84px]">Firstname X.</h3>
            <h3 class="font-light text-[84px]">Firstnamy Y.</h3>
        </div>
    </section>
</template>

<script setup lang="ts"></script>

<style lang="scss">
html,
body {
    background-color: #e1f7ff !important;
    height: 100%;
}

body {
    background-image: url('@/assets/tennis-ball-background.svg');
    background-position: bottom right;
    background-repeat: no-repeat;
}
</style>