<template>
    <div class="page-wrapper">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-4">
                <div class="user-card">
                    <div class="user-card-image">
                        <!-- Profile Image -->
                        <img :src="imageUrl || defaultImageUrl" alt="Profile Image" width="200" height="200" />
                    </div>
                    <!-- File input -->
                    <div class="col-9 mx-auto">
                        <input type="file" class="form-control mt-3" @change="handleImageUpload" accept="image/*" />
                    </div>
                    <!-- Submit button -->
                    <div class="text-center mt-3">
                        <button class="btn btn-primary">Izmijeni sliku korisnika</button>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="user-info">
                    <h3 class="text-center text-lg-start">PODACI KORISNIKA</h3>
                    <div class="user-info-row mt-3">
                        <label>Nickname:</label>
                        <span>{{ userData.nickname }}</span>
                    </div>
                    <div class="user-info-row mt-3">
                        <label>E-mail:</label>
                        <span>{{ userData.email }}</span>
                    </div>
                    <div class="user-info-row mt-3">
                        <label>Password:</label>
                        <span>{{ userData.password }}</span>
                    </div>
                    <div class="user-info-row mt-3">
                        <label>Grade:</label>
                        <span>{{ userData.grade }}</span>
                    </div>
                    <!-- Buttons -->
                    <div class="text-left mt-4">
                        <button class="btn btn-primary">Izmijeni podatke</button>
                    </div>
                    <div class="text-left mt-3">
                        <button class="btn btn-danger me-2">DEAKTIVIRANJE KORISNIKA</button>
                        <button class="btn btn-success">PRISTUP "DARKNET"-U</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center mt-5">
            <div class="col-8">
                <div class="border p-3">
                    <!-- Naziv CHAT -->
                    <h3 class="text-center">CHAT</h3>
                    <!-- Sadržaj chata -->
                    <div class="chat">
                        <div class="row">
                            <div class="col">Red 1</div>
                        </div>
                        <div class="row">
                            <div class="col">Red 2</div>
                        </div>
                        <div class="row">
                            <div class="col">Red 3</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userData: {
                nickname: 'JohnDoe',
                email: 'asd.asd@unipu.hr', // Zadana vrijednost za e-mail adresu
                password: '********',
                grade: 'beginner',
                // Add other user data as needed
            },
            imageUrl: '', // Placeholder for uploaded image URL
            defaultImageUrl: require('@/assets/userpicture.png') // Provide a default image URL
        };
    },
    methods: {
        handleImageUpload(event) {
            const file = event.target.files[0];
            // Implement logic to handle image upload and display
            // This might involve using FileReader API or uploading to a server
        }
    }
};
</script>

<style scoped>
.user-card {
    margin: 20px;
    text-align: center;
}

.user-card-image img {
    border-radius: 50%;
}

.user-info {
    margin: 20px;
    text-align: left;
}

.user-info-row {
    margin-bottom: 10px;
}

label {
    font-weight: bold;
}
</style>