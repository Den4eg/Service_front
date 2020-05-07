<template>
    <div class="main">
        <div class="home">
            <h1>Регистрация</h1>
            <div class="form-group">
                <div class="error-block">
                    <transition name="errors">
                        <h3 class="server-error" v-if="errors">{{ errors }}</h3>
                    </transition>
                </div>

                <form class="form">
                    <div class="input-wrapper">
                        <span class="input-icon">
                            <img
                                src="@/components/assets/avatar.svg"
                                alt="login"
                            />
                        </span>
                        <input
                            id="login"
                            class="input-block"
                            type="text"
                            @input="clearErrors"
                            v-model="login"
                            required
                            autocomplete="off"
                        />
                        <span class="bar"></span>
                        <label for="login" class="label login">Логин</label>
                    </div>
                    <div class="input-wrapper">
                        <span class="input-icon">
                            <img
                                src="@/components/assets/lock.svg"
                                alt="pass"
                            />
                        </span>
                        <input
                            id="password"
                            class="input-block"
                            :type="passwordType"
                            @input="clearErrors"
                            v-model="password"
                            autocomplete="off"
                            required
                        />
                        <span class="bar"></span>
                        <label for="password" class="label">Пароль</label>
                        <span
                            class="input-icon visible"
                            @click="pass_eye = !pass_eye"
                            v-if="password"
                        >
                            <img
                                src="@/components/assets/eye.svg"
                                alt="eye"
                                class="visible"
                                v-if="pass_eye"
                                key="1"
                            />
                            <img
                                src="@/components/assets/hide.svg"
                                alt="!"
                                class="visible"
                                v-else
                                key="2"
                            />
                        </span>
                    </div>
                    <div class="input-wrapper">
                        <span class="input-icon">
                            <img
                                src="@/components/assets/division.svg"
                                alt="division"
                            />
                        </span>
                        <input
                            id="division"
                            class="input-block"
                            type="text"
                            @click="changeDivision"
                            v-model="disvision"
                            autocomplete="off"
                            required
                        />
                        <span class="bar"></span>
                        <label for="division" class="label">Филиал</label>
                    </div>
                </form>
                <div class="btn-group">
                    <button class="btn btn-info" @click.prevent="toAuth">
                        Войти
                    </button>
                    <button
                        class="btn btn-submit"
                        @click.prevent="retisterRequest"
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            login: null,
            password: null,
            disvision: null,
            pass_eye: true,
        };
    },
    methods: {
        retisterRequest() {},
        toAuth() {
            this.$router.push('/auth');
        },
        clearErrors() {
            this.$store.commit('clear_errors');
        },
        changeDivision() {
            console.log('changeDivision');
        },
    },
    computed: {
        passwordType() {
            return this.pass_eye ? 'password' : 'text';
        },
        errors() {
            return this.$store.getters.errData;
        },
    },
};
</script>

<style scoped>
h1 {
    text-align: center;
}
.main {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
}

.home {
    display: flex;
    flex-direction: column;
}

.error-block {
    margin-top: 10px;
    height: 25px;
    text-align: center;
    color: rgb(245, 76, 76);
}
.form-group {
    /* margin-top: 60px; */
    /* width: 300px; */
    /* height: 250px; */
    margin: 0 auto;
}
.form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.3s;
}
.input-wrapper {
    position: relative;
    min-width: 300px;
    min-height: 54px;
    margin-bottom: 5px;
}

.input-block {
    background-color: #e8e8e8;
    outline: none;
    border: none;
    border-bottom: 2px solid #adadad;
    text-indent: 35px;
    font-size: 18px;
    width: 100%;
}

input:focus ~ label,
input:valid ~ label {
    color: #5264ae;
    font-size: 13px;
    top: -18px;
    left: 35px;
}

.bar {
    position: relative;
    display: block;
}
.bar::before,
.bar::after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 0;
    position: absolute;
    background: #5264ae;
    transition: 0.4s ease all;
}
.bar::before {
    left: 50%;
}
.bar::after {
    right: 50%;
}
input:focus ~ .bar::before,
input:focus ~ .bar::after {
    width: 50%;
}

.input-icon {
    position: absolute;
    top: px;
    left: 5px;
    height: 18px;
    width: 18px;
}
.visible {
    width: 22px;
    height: 22px;
    transition: all 0.1s;
    cursor: pointer;
    left: auto;
    right: 6px;
    top: 0;
}

img {
    height: 18px;
    width: 18px;
}
.pass_eye {
    cursor: pointer;
}

.label {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
        'Lucida Sans', Arial, sans-serif;
    font-size: 18px;
    transition: all 0.3s;
    position: absolute;
    top: -5px;
    color: #777;
    left: 38%;
    cursor: text;
}

.login {
    left: 39.2%;
}
.btn-group {
    width: 100%;
    display: flex;
    justify-content: stretch;
    justify-items: stretch;
}

.btn {
    transition: all 0.2s;
    cursor: pointer;
    font-size: 18px;
    color: #fff;
    border-radius: 3px;
    outline: none;
    border: none;
    min-height: 40px;
    padding: 0 10px;
}

.btn-submit {
    width: 100%;
    margin-left: 8px;
    background-color: #09f;
}

.btn-submit:hover {
    background-color: #0099ffd8;
}
.btn-submit:active {
    box-shadow: 0 0 3px 3px #2eacffd8;
    background-color: rgb(7, 147, 241);
}
.btn-info {
    background-color: #f54c4c;
}
.btn-info:hover {
    background-color: #f54c4cd8;
}
.btn-info:active {
    box-shadow: 0 0 3px 3px #f54c4cd8;
    background-color: #f54c4c;
}
/* ========= Animate ========= */
.errors-enter-active {
    animation: errors 0.7s;
}
@keyframes errors {
    0% {
        transform: translate3d(0, 0, 0);
    }

    15% {
        transform: translate3d(-5px, 0, 0);
    }

    30% {
        transform: translate3d(5px, 0, 0);
    }

    45% {
        transform: translate3d(-5px, 0, 0);
    }

    60% {
        transform: translate3d(5px, 0, 0);
    }

    75% {
        transform: translate3d(-5px, 0, 0);
    }

    100% {
        transform: translate3d(0, 0, 0);
    }
}
</style>
