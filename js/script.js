document.addEventListener('DOMContentLoaded', () => {
    // Charger les données du fichier JSON
    fetch('data/tontine-data.json')
        .then(response => response.json())
        .then(data => {
            populateTable(data, 'tontine-table');
            populateTable(data, 'admin-table', true);
        });

    // Fonction pour peupler les tables
    function populateTable(data, tableId, isAdmin = false) {
        const tableBody = document.getElementById(tableId).querySelector('tbody');
        tableBody.innerHTML = ''; // Vider le contenu actuel

        data.forEach(participant => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${participant.nom}</td>
                <td>${participant.mois1}</td>
                <td>${participant.mois2}</td>
                <td>${participant.mois3}</td>
                <td>${participant.mois4}</td>
                <td>${participant.mois5}</td>
                <td>${participant.fondsRecuperes}</td>
            `;

            if (isAdmin) {
                row.innerHTML += `
                    <td>
                        <button class="edit-btn">Éditer</button>
                        <button class="delete-btn">Supprimer</button>
                    </td>
                `;
            }

            tableBody.appendChild(row);
        });
    }

    // Gestion du formulaire d'ajout de participant
    const form = document.getElementById('add-participant-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const nameInput = document.getElementById('name').value;

        if (nameInput) {
            const newParticipant = {
                nom: nameInput,
                mois1: "Non Payé",
                mois2: "Non Payé",
                mois3: "Non Payé",
                mois4: "Non Payé",
                mois5: "Non Payé",
                fondsRecuperes: "Non"
            };

            // Ici, vous ajouteriez le participant aux données JSON (localement pour cette démo)
            // puis rechargeriez les tables. Dans une application réelle, vous devriez mettre à jour
            // les données sur le serveur.

            alert(`Le participant ${nameInput} a été ajouté.`);
        }
    });

    // Gestion des boutons Éditer et Supprimer (non fonctionnel dans cet exemple)
});
