document.addEventListener("DOMContentLoaded", () => {
  // --- Validação do formulário (somente se existir o formulário) ---
  const form = document.querySelector("#volunteerForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const idade = form.idade.value;
      const telefone = form.querySelector('input[type="tel"]').value.trim();
      const cpf = form.querySelector('input[placeholder="000.000.000-00"]').value.trim();
      const erros = [];

      // --- Validações ---
      if (nome.length < 3) erros.push("O nome deve ter pelo menos 3 caracteres.");
      if (!email.includes("@")) erros.push("Digite um e-mail válido.");
      if (idade < 18 || idade === "") erros.push("Você precisa ter 18 anos ou mais.");
      if (!telefone.match(/\([0-9]{2}\)\s[0-9]{5}-[0-9]{4}/))
        erros.push("Telefone no formato (00) 00000-0000.");
      if (!cpf.match(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/))
        erros.push("CPF no formato 000.000.000-00.");

      // --- Cria ou atualiza a área de aviso ---
      let aviso = document.querySelector("#aviso");
      if (!aviso) {
        aviso = document.createElement("div");
        aviso.id = "aviso";
        form.insertAdjacentElement("afterend", aviso);
      }

      aviso.style.padding = "20px";
      aviso.style.margin = "20px auto";
      aviso.style.maxWidth = "500px";
      aviso.style.borderRadius = "15px";
      aviso.style.fontWeight = "bold";
      aviso.style.textAlign = "center";
      aviso.style.transition = "all 0.3s ease";

      if (erros.length > 0) {
        aviso.innerHTML = erros.join("<br>");
        aviso.style.backgroundColor = "#ffe6e6";
        aviso.style.color = "#b30000";
      } else {
        aviso.innerHTML = "✅ Cadastro realizado com sucesso!";
        aviso.style.backgroundColor = "#e6ffe6";
        aviso.style.color = "#006600";
        form.reset();
      }

      // --- Scroll suave até o aviso ---
      aviso.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // --- Dropdown do menu (para desktop) ---
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("mouseenter", () => {
      const menu = dropdown.querySelector(".dropdown-menu");
      if (menu) menu.classList.add("ativo");
    });
    dropdown.addEventListener("mouseleave", () => {
      const menu = dropdown.querySelector(".dropdown-menu");
      if (menu) menu.classList.remove("ativo");
    });
  });
});
