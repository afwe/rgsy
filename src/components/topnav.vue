<template>
    <div class="topnav" :style="styleObject">
        <div class="search-bar" v-if="!isWap">
            <input
                type="text"
                if="search"
                placeholder="搜索用户"
            />
        </div>
        <div class="wap-bar" v-else>
        </div>
        <div class="logo">
        </div>
        <div class="friend">
            <router-link>
                <div>
                </div>
            </router-link>
        </div>
        <div class="tube">
            <router-link>
                <div>
                </div>
            </router-link>
        </div>
    </div>
</template>