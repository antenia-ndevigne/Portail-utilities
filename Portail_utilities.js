// ==UserScript==
// @name         Portail utilities
// @namespace    https://portail.leaderinfo.com/portail
// @version      2026-05-20
// @description  Liste d'utilitaires pour améliorer l'utilisation du portail antenia
// @author       ndevigne
// @downloadURL  https://gitlab.com/Turtle4Man/tampermonkey/-/blob/94e843030346fffae6d285dfea2c0be5116b5eb4/Portail_utilities.js
// @updateURL    https://gitlab.com/Turtle4Man/tampermonkey/-/blob/94e843030346fffae6d285dfea2c0be5116b5eb4/Portail_utilities.js
// @match        https://portail.leaderinfo.com/portail/*
// @icon         https://portail.leaderinfo.com/portail/images/favicon2.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('change', (e) => {

        if (e.target.classList.contains('branch-source')) {

            const intervalle = setInterval(() => {

                if (document.querySelector('#patchs-container').innerHTML != "") {
                    document.querySelectorAll(`.patch`).forEach((patch) => {
                        const checkbox = patch.querySelector(`[type='checkbox']`)

                        checkbox.addEventListener('change', (checkbox) => {
                            const commentaire = patch.querySelector(`.commentaire`).textContent

                            let type = commentaire.match(/(\[EVO\]|\[BUG\])/)
                            if (type != null) type = type[1].replace(/[\[\]]/g, '')
                            else type = ""

                            let mantis = commentaire.match(/Mantis : ([0-9]*) /)
                            if (mantis != null) mantis = mantis[1]
                            else mantis = ""

                            let messages = ""

                            document.querySelectorAll(`.patch.active`).forEach((activePatch) => {
                                const activeCommentaire = activePatch.querySelector(`.commentaire`).textContent
                                let message = activeCommentaire.match(/Mantis : [0-9]* : (.*)/)
                                if (message != null) {
                                    message = message[1]
                                    if (messages != "") messages += `\n`
                                    messages += message
                                }
                                else message = ""
                            })

                            document.querySelector(`#type-commit`).value = type
                            document.querySelector(`#numero-mantis`).value = mantis
                            document.querySelector(`#commentaire`).value = messages

                            clearInterval(intervalle)
                        })
                    })
                }
            }, 500)
        }

        if (e.target.id == "listServeurs"){

            const intervalle = setInterval(() => {

                if (document.querySelector('#listePatchs').innerHTML != "") {
                    const checkboxes = document.querySelectorAll('.logs input.numPatch[type="checkbox"]');

                    checkboxes.forEach(function (checkbox) {
                        if (!checkbox.disabled) {
                            const ligne = checkbox.closest('li');

                            if (ligne) {
                                ligne.style.color = 'red';
                                ligne.style.fontWeight = 'bold';
                            }
                        }
                    });

                    clearInterval(intervalle)
                }
            }, 500)
        }
    })
})();
