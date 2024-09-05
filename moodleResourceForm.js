(function(global) {
    // Definición de la librería como un objeto llamado `MoodleResourceForm`
    const MoodleResourceForm = {};

    /*
    * Función que envía un formulario a Moodle para importar un recurso
    * @param {string} moodleUrl - URL de la instancia de Moodle
    * @param {string} fileUrl - URL del archivo a importar
    * @param {string} resourceName - Nombre del recurso
    * @param {string} resourceSummary - Resumen del recurso
    *   
    * @return {void}
    *   
    * @example
    *   
    *  MoodleResourceForm.sendForm('https://moodle.example.com', 'https://example.com/file.pdf', 'Archivo de ejemplo', 'Este es un archivo de ejemplo');
    *   
    */
    MoodleResourceForm.sendForm = function(moodleUrl, fileUrl, resourceName, resourceSummary) {

        const normalizedUrl = moodleUrl.endsWith('/') ? moodleUrl : `${moodleUrl}/`;
        const targetUrl = `${normalizedUrl}admin/tool/moodlenet/import.php`;

        // Crea un nuevo formulario en memoria para hacer el POST
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = targetUrl;
        form.target = '_blank'; // Abre el formulario en una nueva pestaña

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
            "icon": "",
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
