import {email, password} from "../../src/utils/auth-test-data";
import {url} from "../../src/utils/url-test-data";


describe('Creact order', () => {
	before(() => {
		cy.viewport(1600, 1160);
		cy.visit(url);
	});
	
	it("should order", () => {
		cy.visit(`${url}login`);
		cy.get("[type=email]").type(email);
		cy.get("[type=password]").type(password);
		cy.get("button").click();
		
		cy.get('[class^=burger-ingredients_types]').first().as('products');
		cy.get('[class^=burger-constructor]').first().as('area');
		
		cy.get('@products').find('[class^=burger-ingredient_cart]').first().as('productBun');
		cy.get('@products').find('[class^=burger-ingredient_cart]').eq(10).as('product');
		
		cy.get('@productBun').trigger("dragstart").trigger("dragleave");
		cy.get("@area").trigger("dragenter")
			.trigger("dragover")
			.trigger("drop")
			.trigger("dragend");
		
		
		cy.get('@product').trigger("dragstart").trigger("dragleave");
		cy.get("@area").trigger("dragenter")
			.trigger("dragover")
			.trigger("drop")
			.trigger("dragend");
		
		
		cy.get("button").click();
		
		cy.wait(16000);
		
		cy.get('[class^=modal_close]').click();
	});
});

describe('Ingredient details modal', function () {
	before(() => {
		cy.viewport(1600, 1160);
		cy.visit(url);
	});
	
	it("should open and close modal", () => {
		cy.get('[class^=burger-ingredients_types]').first().as('products');
		cy.get('@products').find('[class^=burger-ingredient_cart]').eq(10).as('product');
		cy.get('@products').click();
		
		cy.wait(2000);
		
		cy.get('[class^=modal_close]').click();
	})
});