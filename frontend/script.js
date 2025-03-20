const BASE_URL = "http://localhost:3000";

// Register User
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    document.getElementById("registerResponse").textContent = data.message || data.error;
  } catch (error) {
    console.error("Error:", error);
  }
});

// Create Vault
document.getElementById("createVaultForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("vaultUsername").value;
  const password = document.getElementById("vaultPassword").value;
  const data = document.getElementById("vaultData").value;

  try {
    const response = await fetch(`${BASE_URL}/vaults?username=${username}&password=${password}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    const result = await response.json();
    document.getElementById("createVaultResponse").textContent = result.message || result.error;
  } catch (error) {
    console.error("Error:", error);
  }
});

// Get Vaults
document.getElementById("getVaultsForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("getVaultsUsername").value;
  const password = document.getElementById("getVaultsPassword").value;

  try {
    const response = await fetch(`${BASE_URL}/vaults?username=${username}&password=${password}`);
    const vaults = await response.json();
    const vaultsList = document.getElementById("vaultsList");
    vaultsList.innerHTML = vaults.map(vault => `
      <div class="vault-item">
        <p><strong>Vault ID:</strong> ${vault._id}</p>
        <p><strong>Data:</strong> ${vault.data}</p>
        <p><strong>Created At:</strong> ${vault.createdAt}</p>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error:", error);
  }
});

// Delete User
document.getElementById("deleteUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("deleteUsername").value;
  const password = document.getElementById("deletePassword").value;

  try {
    const response = await fetch(`${BASE_URL}/users?username=${username}&password=${password}`, {
      method: "DELETE",
    });
    const data = await response.json();
    document.getElementById("deleteUserResponse").textContent = data.message || data.error;
  } catch (error) {
    console.error("Error:", error);
  }
});