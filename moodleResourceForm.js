(function(global) {
    // Definimos nuestra librería como un objeto llamado `MoodleResourceForm`
    const MoodleResourceForm = {};

    // Función para crear y enviar el formulario
    MoodleResourceForm.sendForm = function(moodleUrl, fileUrl, resourceName, resourceSummary) {
        const targetUrl = `${moodleUrl}/admin/tool/moodlenet/import.php`;

        // Crea un nuevo formulario en memoria para hacer el POST
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = targetUrl;
        form.target = '_blank'; // Esto abre el formulario en una nueva pestaña

        // Agregamos los campos ocultos al formulario
        const resourceurlInput = document.createElement('input');
        resourceurlInput.type = 'hidden';
        resourceurlInput.name = 'resourceurl';
        resourceurlInput.value = fileUrl;
        form.appendChild(resourceurlInput);

        const resourceinfoInput = document.createElement('input');
        resourceinfoInput.type = 'hidden';
        resourceinfoInput.name = 'resource_info';
        resourceinfoInput.value = JSON.stringify({
            "canonicalUrl": fileUrl,
            "icon": "", // Puedes añadir un icono si es necesario
            "name": resourceName,
            "summary": resourceSummary,
        });
        form.appendChild(resourceinfoInput);

        const type = document.createElement('input');
        type.type = 'hidden';
        type.name = 'type';
        type.value = 'file';
        form.appendChild(type);

        document.body.appendChild(form); // Agrega el formulario al DOM
        form.submit(); // Envía el formulario
    };

    // Exponemos la librería al objeto global
    global.MoodleResourceForm = MoodleResourceForm;

})(window);
