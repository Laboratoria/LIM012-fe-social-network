export const templateComment = () => {
  const div = document.createElement('div');
  div.className = 'name-comments';
  const template = `
    <img src="./images/profile-img-woman.png" class="user-comment">
    <div class="columnComment">
        <div class="name-Date">
            <span class="comment">
                <i id="option-id" class="fas fa-ellipsis-h"></i>
            </span>
            <h2><b>Aqui va el nombre</b><br>Aqui va la fecha</h2>
        <div>
     
    <div class="text-post">
        <p class="p-comment" id="textComment-id}">Aquí va el comentario</p>
        <div class="save-comment hide" idComent="id"><i class="far fa-save"></i></div>
    </div>
    
    
    <div class="tooltip-container hide" id="show-tootTip-id">
        <div class="tooltip">
            <div idComent="id" class="opt update-comment edit-id"><i class="fas fa-edit icon-tool"></i> <span>Editar</span></div>
            <div idComent="id" class="opt del"> <i class="fas fa-trash-alt icon-tool"></i><span>Eliminar</span></div>
        </div>
    </div>
    </div>   
    `;

  div.innerHTML = template;
  return div;
};
