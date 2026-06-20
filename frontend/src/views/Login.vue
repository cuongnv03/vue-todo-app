<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

import MainLayout from '../layouts/MainLayout.vue'

import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

import { useAuthStore } from '../stores/auth.store'

import {
  validateLoginForm,
  validateRegisterForm
} from '../validators/auth.validator'

import { getErrorMessage } from '../utils/error'
import { getFirstValidationMessage } from '../utils/validation'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const mode = ref('login')
const errorMessage = ref('')

const form = reactive({
    username: '',
    password: ''
})

const isLoginMode = computed(() => mode.value === 'login')

const title = computed(() => {
    return isLoginMode.value ? 'Login' : 'Register'
})

const submitLabel = computed(() => {
    return isLoginMode.value ? 'Login' : 'Create account'
})

function switchMode() {
    errorMessage.value = ''
    mode.value = isLoginMode.value ? 'register' : 'login'
}

async function submitForm() {
    errorMessage.value = ''

    const validationResult = isLoginMode.value
        ? validateLoginForm(form)
        : validateRegisterForm(form)

    if (!validationResult.valid) {
        errorMessage.value = getFirstValidationMessage(
            validationResult.errors,
            'Invalid form'
        )
        return
    }

    try {
        if (isLoginMode.value) {
            await authStore.login(validationResult.data)

            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Login successfully',
                life: 3000
            })

            router.push({
                name: 'home'
            })
        } else {
            await authStore.register(validationResult.data)

            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Register successfully. Please login.',
                life: 3000
            })

            mode.value = 'login'
            form.password = ''
        }
    } catch (error) {
        errorMessage.value = getErrorMessage(error, `${title.value} failed`)
    }
}
</script>

<template>
    <MainLayout>
        <div class="login-page">
            <Card class="login-card">
                <template #title>
                    {{ title }}
                </template>

                <template #content>
                    <form class="login-form" @submit.prevent="submitForm">
                        <div class="form-field">
                            <label for="username">Username</label>
                            <InputText
                                id="username"
                                v-model="form.username"
                                autocomplete="username"
                                placeholder="Enter username"
                            />
                        </div>

                        <div class="form-field">
                            <label for="password">Password</label>
                            <Password
                                id="password"
                                v-model="form.password"
                                :feedback="!isLoginMode"
                                toggleMask
                                placeholder="Enter password"
                            />

                            <small v-if="!isLoginMode">
                                Password must be at least 6 characters.
                            </small>
                        </div>

                        <Message
                            v-if="errorMessage"
                            severity="error"
                            :closable="false"
                        >
                            {{ errorMessage }}
                        </Message>

                        <Button
                            type="submit"
                            :label="submitLabel"
                            :loading="authStore.loading"
                            class="submit-button"
                        />

                        <Button
                            type="button"
                            text
                            severity="secondary"
                            :label="isLoginMode ? 'Need an account? Register' : 'Already have an account? Login'"
                            @click="switchMode"
                        />
                    </form>
                </template>
            </Card>
        </div>
    </MainLayout>
</template>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
}

.login-card {
    width: 100%;
    max-width: 420px;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.submit-button {
    width: 100%;
}
</style>