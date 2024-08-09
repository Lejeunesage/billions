document.addEventListener('DOMContentLoaded', () => {
    const dataUrl = 'data/tontine-data.json';

    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            populateTable(data, 'tontine-table');
            populateTable(data, 'admin-table', true);
        });

    function populateTable(data, tableId, isAdmin = false) {
        const tableBody = document.getElementById(tableId).querySelector('tbody');
        tableBody.innerHTML = '';

        data.forEach(participant => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${participant.nom}</td>
                <td>${participant.mois1 || ''}</td>
                <td>${participant.mois2 || ''}</td>
                <td>${participant.mois3 || ''}</td>
                <td>${participant.mois4 || ''}</td>
                <td>${participant.mois5 || ''}</td>
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

    const form = document.getElementById('add-participant-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nameInput = document.getElementById('name').value;
        const selectedMonth = document.getElementById('month').value;

        if (nameInput && selectedMonth) {
            const newParticipant = {
                nom: nameInput,
                mois1: "",
                mois2: "",
                mois3: "",
                mois4: "",
                mois5: "",
                fondsRecuperes: "NON"
            };

            newParticipant[selectedMonth] = "20000";

            // Ici, vous devriez sauvegarder le nouveau participant dans un fichier JSON ou une base de données
            // Pour cette démo, on l'ajoute simplement au tableau existant
            fetch(dataUrl)
                .then(response => response.json())
                .then(data => {
                    data.push(newParticipant);
                    populateTable(data, 'admin-table', true);
                    populateTable(data, 'tontine-table');
                });

            alert(`Le participant ${nameInput} a été ajouté avec un paiement de 20000 F pour ${selectedMonth}.`);
        }
    });
});
