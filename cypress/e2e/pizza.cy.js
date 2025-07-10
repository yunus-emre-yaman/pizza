describe("Pizza Sipariş Sistemi", () => {
  it("Anasayfada 'ACIKTIM' butonuna tıklanabiliyor mu?", () => {
    cy.visit("http://localhost:5173");
    cy.get("button.order-button").should("exist").click();
    cy.url().should("include", "/order");
  });

  it("İsim yazılmadan sipariş verilemiyor", () => {
    cy.visit("http://localhost:5173/order");
    cy.get('select[name="size"]').select("Orta");
    cy.get('select[name="dough"]').select("İnce");
    cy.get('input[type="checkbox"]').eq(0).check();
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/order");
  });

  it("Sipariş notu girilmeden de sipariş verilebiliyor", () => {
    cy.visit("http://localhost:5173/order");

    cy.get('input[name="name"]').type("Ali");
    cy.get('select[name="size"]').select("Büyük");
    cy.get('select[name="dough"]').select("Kalın");

    cy.get('input[type="checkbox"]').eq(0).check();
    cy.get('input[type="checkbox"]').eq(1).check();

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/success");
  });

  it("Sipariş sonrası 'TEBRİKLER' yazısı görünüyor mu?", () => {
    cy.visit("http://localhost:5173/order");

    cy.get('input[name="name"]').type("Test Kullanıcı");
    cy.get('select[name="size"]').select("Küçük");
    cy.get('select[name="dough"]').select("İnce");
    cy.get('input[type="checkbox"]').eq(0).check();

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/success");
    cy.contains("TEBRİKLER").should("exist"); 
  });
});
