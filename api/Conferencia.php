<?php
class Conferencia
{
    public $id;
    public $titulo;
    public $orador;
    public $fecha;
    public $horario;
    public $ubicacion;
    public $sinopsis;
    public $categoria;

    public function __construct($titulo,$orador,$fecha,$horario=null,$ubicacion=null,$sinopsis=null,$categoria=null,$id=null)
    {
      $this->id=$id;  
      $this->titulo=$titulo;  
      $this->orador=$orador; 
      $this->fecha=$fecha;
      $this->horario=$horario;
      $this->ubicacion=$ubicacion;
      $this->sinopsis=$sinopsis;  
      $this->categoria=$categoria;  
    }

    public function fromArray($data)
    {
        return new self
        (
            $data['id'] ?? null,
            $data['titulo'] ?? null,
            $data['orador'] ?? null,
            $data['fecha'] ?? null,
            $data['horario'] ?? null,
            $data['ubicacion'] ?? null,
            $data['sinopsis'] ?? null,
            $data['categoria'] ?? null,
        );
    }

    public function toArray()
    {
        return get_object_vars($this);
    }
    
}
?>