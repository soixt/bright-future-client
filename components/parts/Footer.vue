<template>
    <footer>
        <div class="container">
            <div class="columns footer-body">
                <div class="column">
                    <div class="pt-10 pb-10">
                        <div class="footer-description">Bright Future is an online service that helps you present your profile to hundreds of schools coaches and/or directors in less than few minutes.</div>
                    </div>
                    <Divider/>
                    <div>
                        <div class="social-links">
                            <a href="https://www.facebook.com/www.brightfuture.rs/" target="_blank"><b-icon icon="facebook"></b-icon></a>
                            <a href="https://twitter.com/brightfuture_rs/" target="_blank"><b-icon icon="twitter"></b-icon></a>
                            <a href="https://www.instagram.com/sasaorasanin/" target="_blank"><b-icon icon="instagram"></b-icon></a>
                            <a href="https://www.youtube.com/channel/UC87uJBgOVFALgsnIIHQ4sJw" target="_blank"><b-icon icon="youtube"></b-icon></a><br>
                            © 2020 | <nuxt-link :to="{ name: 'index' }">Bright Future</nuxt-link> | All Rights Reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {}
</script>