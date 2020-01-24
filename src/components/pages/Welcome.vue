<template>
    <div class="main">
        <div class="wrap">
            <div class="form-wrapper">
                <div class="alerting">
                    <p v-if="loginPage">
                        Sign In
                    </p>
                    <p v-else>Sign Up</p>
                </div>
                <form id="loginForm">
                    <div class="input-wrapper">
                        <input
                            type="text"
                            name="login"
                            autocomplete="off"
                            id="login"
                            required
                            :class="{ 'input-error': $v.formLogin.$error }"
                            v-model="$v.formLogin.$model"
                        />
                        <span class="bar"></span>
                        <label
                            for="login"
                            :class="{ 'label-error': $v.formLogin.$error }"
                            >login</label
                        >
                    </div>

                    <div class="input-wrapper">
                        <input
                            type="text"
                            name="password"
                            autocomplete="off"
                            id="pass"
                            :class="{ 'input-error': $v.formPassword.$error }"
                            required
                            v-model="$v.formPassword.$model"
                        />
                        <span class="bar"></span>
                        <label
                            for="pass"
                            :class="{ 'label-error': $v.formPassword.$error }"
                            >password</label
                        >
                    </div>
                    <div class="btn-wrap" v-if="loginPage">
                        <button
                            type="submit"
                            :disabled="$v.$invalid"
                            :class="{ 'btn-disabled': $v.$invalid }"
                            class="btn btn-submit"
                            @click.prevent="vue_login"
                        >
                            Log in
                        </button>
                    </div>
                    <div class="btn-wrap" v-else>
                        <button
                            type="submit"
                            :disabled="$v.$invalid"
                            :class="{ 'btn-disabled': $v.$invalid }"
                            class="btn btn-submit"
                            @click.prevent="vue_register"
                        >
                            Register
                        </button>
                    </div>
                    <span
                        class="formSwitch"
                        @click="formSwitch"
                        v-if="loginPage"
                        >Sign Up</span
                    >
                    <span class="formSwitch" @click="formSwitch" v-else
                        >Sign in</span
                    >
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { eventEmiter } from '../../main';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            formLogin: '',
            formPassword: '',
            loginPage: true
        };
    },
    validations: {
        formLogin: {
            required,
            minLength: minLength(3)
        },
        formPassword: {
            required
        }
    },
    methods: {
        async vue_login() {
            let result = await fetch('http://localhost:5000/api/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: this.formLogin,
                    password: this.formPassword
                })
            });
            let resJson = await result.json();
            eventEmiter.$data.userDetails = resJson;
            console.log('response ', resJson);

            console.log(eventEmiter.$data.userDetails);
        },
        async vue_register() {
            try {
                let tempUserData = await fetch(
                    'http://localhost:5000/api/register',
                    {
                        method: 'post',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({
                            login: this.formLogin,
                            password: this.formPassword
                        })
                    }
                );
                let userDataJson = await tempUserData.json();
                console.log(userDataJson);
            } catch (e) {
                console.log(e);
            }
        },
        formSwitch() {
            this.loginPage = !this.loginPage;
        }
    }
};
</script>

<style scoped>
.main {
    position: relative;
    display: grid;
    justify-items: center;
    align-items: center;
}

.wrap {
    position: absolute;
    display: grid;
    justify-items: center;
}

h1 {
    font-family: 'Comfortaa', cursive;
    text-align: center;
    margin-top: 40px;
    padding: 5px 0 15px;
    margin-bottom: 15px;
}

p {
    text-align: center;
    font-family: 'Comfortaa', cursive;
    font-size: 18px;
    white-space: nowrap;
}

.alerting {
    font-weight: 600;
    line-height: 30px;
}

.form-wrapper {
    border-radius: 2px;
    padding: 20px;
    margin-bottom: 10px;
    box-shadow: 0 0 7px #3d3d3d;
    width: 280px;
    height: 300px;
    background-color: #eee;
    display: grid;
    grid-template-rows: 1fr 3fr;
    justify-items: center;
}

.formSwitch {
    position: absolute;
    right: 18px;
    bottom: 80px;
    color: #0062cc;
    cursor: pointer;
}
.formSwitch:hover {
    color: blueviolet;
}

.btn-submit {
    width: 100%;
    height: 40px;
    margin-top: 10px;
    display: inline-block;
    font-weight: 400;
    color: #fff;
    background-color: #0069d9;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid #0062cc;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: pointer;
}

.btn-submit:hover {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}

.btn-submit:focus {
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
}

.btn-disabled,
.btn-disabled:disabled:hover {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
    cursor: default;
}

/* ==========================> form */
#loginForm {
    width: 100%;
    display: grid;
    flex-direction: column;
    align-content: end;
    grid-gap: 30px;
}

.input-wrapper {
    align-self: center;
    justify-self: center;
    position: relative;
    width: 100%;
}

.input-error {
    border-bottom: 2px solid #ff1616a1;
}

input {
    width: 100%;
    height: 30px;
    font-size: 20px;
    text-indent: 10px;
    background-color: #eee;
    color: #222222;
    border: none;
    border-bottom: 2px solid #c5c5c5;
    overflow: hidden;
}

label {
    transition: all 0.4s ease;
    top: 3px;
    padding: 0 4px 0 4px;
    pointer-events: none;
    position: absolute;
    font-size: 18px;
    color: #aaaaaa;
}

input:focus {
    outline-style: none;
}
input:focus ~ label,
input:valid ~ label {
    top: -18px;
    left: 0px;
    font-size: 14px;
    color: #3241ca;
}
.label-error {
    color: red !important;
}
/* BOTTOM BARS =================================  */
.bar {
    position: relative;
    display: block;
}
.bar:before,
.bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 0;
    position: absolute;
    background: #5264ae;
    transition: 0.4s ease all;
}
.bar:before {
    left: 50%;
}
.bar:after {
    right: 50%;
}

input:focus ~ .bar:before,
input:focus ~ .bar:after {
    width: 50%;
}
</style>
