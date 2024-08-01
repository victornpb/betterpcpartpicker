// ==UserScript==
// @name         Better PCPartPicker
// @namespace    https://github.com/victornpb
// @version      0.5
// @description  Toggle between table and grid view on PCPartPicker
// @author       Victor
// @contributionURL https://www.buymeacoffee.com/vitim
// @match        https://pcpartpicker.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Function to add the toggle button to .productList__actions
    function addToggleButton() {
        const actionsContainer = document.querySelector('.productList__actions');
        if (actionsContainer && !document.querySelector('#toggleGridButton')) { // Check if the button is already added
            const toggleButton = document.createElement('button');
            toggleButton.id = 'toggleGridButton';
            toggleButton.textContent = 'Toggle Grid View';
            toggleButton.style.marginLeft = '10px';
            toggleButton.style.padding = '5px 10px';
            toggleButton.style.backgroundColor = '#007bff';
            toggleButton.style.color = '#fff';
            toggleButton.style.border = 'none';
            toggleButton.style.borderRadius = '5px';
            toggleButton.style.cursor = 'pointer';

            // Append the button to the actions container
            actionsContainer.appendChild(toggleButton);

            // Add event listener to toggle grid view
            let isGridView = false;
            toggleButton.addEventListener('click', () => {
                isGridView = !isGridView;
                if (isGridView) {
                    document.documentElement.classList.add('grid-view-active');
                } else {
                    document.documentElement.classList.remove('grid-view-active');
                }
            });
        }
    }

    // Initial styles for normal view
    GM_addStyle(`
        :root {
            --size: 128px;
        }

        table.productList--detailed tr td.td__name a .td__image {
            width: var(--size);
            height: var(--size);
        }

        .productList--detailed .tr__product .td__imageWrapper {
            width: var(--size) !important;
            height: var(--size) !important;
        }
    `);

    // Scoped CSS for grid view
    GM_addStyle(`
        .grid-view-active #paginated_table {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
        }

        .grid-view-active #paginated_table thead {
            display: none;
        }

        .grid-view-active #paginated_table tbody {
            display: contents;
        }

        .grid-view-active #paginated_table .tr__product {
            position: relative;
            display: flex;
            flex-direction: column;
            border: 1px solid #ddd;
            padding: 5px;
            background-color: #f9f9f9;
            align-items: center;
            text-align: center;
        }

        .grid-view-active #paginated_table .td__checkbox {
            position: absolute;
            z-index: 99999;
            left: 3px;
            top: 3px;
        }

        .grid-view-active #paginated_table .td__name {
            padding: 0px;
        }

        .grid-view-active #paginated_table .td__name a {
            display: flex;
            flex-direction: column;
        }

        .grid-view-active #paginated_table .td__imageWrapper {
            width: 100%;
            margin-bottom: 10px;
        }

        .grid-view-active #paginated_table .td__image {
            width: 100%;
            display: block;
        }

        .grid-view-active #paginated_table .td__nameWrapper {
            margin-bottom: 10px;
            font-weight: bold;
        }

        .grid-view-active #paginated_table .td__nameWrapper p {
            margin: 0;
            font-size: 1.1em;
        }

        .grid-view-active #paginated_table .td__spec,
        .grid-view-active #paginated_table .td__rating,
        .grid-view-active #paginated_table .td__price {
            margin-bottom: 1px;
        }

        .grid-view-active {
            --size: 100%;
        }

        .grid-view-active table.productList--detailed tr td.td__name a .td__image {
            width: var(--size);
            height: var(--size);
        }

        .grid-view-active .productList--detailed .tr__product .td__imageWrapper {
            width: var(--size) !important;
            height: var(--size) !important;
        }
    `);

    // Observe DOM changes to re-add the button if necessary
    const observer = new MutationObserver(() => {
        addToggleButton();
    });

    // Start observing the body for changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial call to add the toggle button
    addToggleButton();
})();
