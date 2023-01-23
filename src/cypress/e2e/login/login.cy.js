/// <reference types="cypress" />


describe('basic functions', () => {
    beforeEach(() => {

        cy.visit('localhost:3333')
        cy.clearAllLocalStorage()
    })

    it('displays two todo items by default', () => {
        cy.contains('로그인')
            .click()


        cy.get('[placeholder="이메일"]')
            .type('test')
        cy.get('[placeholder="비밀번호"]')
            .type('test')

        cy.intercept({ url: 'https://api.staging.careerdive.co.kr/account/login', method: 'POST' })
            .as('login')

        cy.get('button').last()
            .click()

        cy.wait('@login').then((apiRes) => {
            console.log('hi', apiRes)
            cy.getAllLocalStorage()
                .then((result) => {
                    const response = apiRes.response.body
                    const ls = result['http://localhost:3333']

                    expect(+ls.UserID).to.equal(response.UserID)
                    expect(ls.NickName).to.equal(response.NickName)
                    expect(JSON.parse(ls.IsMentor)).to.equal(response.IsMentor)

                })

        })



        /* ==== Generated with Cypress Studio ==== */
        cy.get('.css-jyijto > .css-1gxq6p0').click();
        /* ==== End Cypress Studio ==== */
    })

    // it('can add new todo items', () => {
    //     // We'll store our item text in a variable so we can reuse it
    //     const newItem = 'Feed the cat'

    //     cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)


    //     cy.get('.todo-list li')
    //         .should('have.length', 3)
    //         .last()
    //         .should('have.text', newItem)
    // })

    // it('can check off an item as completed', () => {

    //     cy.contains('Pay electric bill')
    //         .parent()
    //         .find('input[type=checkbox]')
    //         .check()


    //     cy.contains('Pay electric bill')
    //         .parents('li')
    //         .should('have.class', 'completed')
    // })

    // context('with a checked task', () => {
    //   beforeEach(() => {

    //     cy.contains('Pay electric bill')
    //       .parent()
    //       .find('input[type=checkbox]')
    //       .check()
    //   })

    //   it('can filter for uncompleted tasks', () => {

    //     cy.contains('Active').click()


    //     cy.get('.todo-list li')
    //       .should('have.length', 1)
    //       .first()
    //       .should('have.text', 'Walk the dog')


    //     cy.contains('Pay electric bill').should('not.exist')
    //   })

    //   it('can filter for completed tasks', () => {

    //     cy.contains('Completed').click()

    //     cy.get('.todo-list li')
    //       .should('have.length', 1)
    //       .first()
    //       .should('have.text', 'Pay electric bill')

    //     cy.contains('Walk the dog').should('not.exist')
    //   })

    //   it('can delete all completed tasks', () => {
    //     // First, let's click the "Clear completed" button
    //     // `contains` is actually serving two purposes here.
    //     // First, it's ensuring that the button exists within the dom.
    //     // This button only appears when at least one task is checked
    //     // so this command is implicitly verifying that it does exist.
    //     // Second, it selects the button so we can click it.
    //     cy.contains('Clear completed').click()

    //     // Then we can make sure that there is only one element
    //     // in the list and our element does not exist
    //     cy.get('.todo-list li')
    //       .should('have.length', 1)
    //       .should('not.have.text', 'Pay electric bill')

    //     // Finally, make sure that the clear button no longer exists.
    //     cy.contains('Clear completed').should('not.exist')
    //   })
    // })
})