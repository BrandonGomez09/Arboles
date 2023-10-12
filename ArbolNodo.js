//Brandon Gomez Alcazar 231205
class  NodoArbol {
    constructor(usuario) {
      this.usuario = usuario;
      this.izquierda = null;
      this.derecha = null;
    }
  }
  
  class ArbolUsuarios {
    constructor() {
      this.raiz = null;
    }
  
    // Método para buscar un usuario por su ID
    buscarUsuarioPorId(id) {
      return this._buscarUsuarioPorId(this.raiz, id);
    }
  
    _buscarUsuarioPorId(nodo, id) {
      if (nodo === null) {
        return null; // Usuario no encontrado
      }
  
      if (id === nodo.usuario.id) {
        return nodo.usuario; // Usuario encontrado
      } else if (id < nodo.usuario.id) {
        return this._buscarUsuarioPorId(nodo.izquierda, id); // Buscar en el subárbol izquierdo
      } else {
        return this._buscarUsuarioPorId(nodo.derecha, id); // Buscar en el subárbol derecho
      }
    }
  
    // Método para insertar un usuario en el árbol
    insertarUsuario(usuario) {
      this.raiz = this._insertarUsuario(this.raiz, usuario);
    }
  
    _insertarUsuario(nodo, usuario) {
        if (nodo === null) {
          return new NodoArbol(usuario);
        }
      
        if (usuario.id < nodo.usuario.id) {
          nodo.izquierda = this._insertarUsuario(nodo.izquierda, usuario);
        } else if (usuario.id > nodo.usuario.id) {
          nodo.derecha = this._insertarUsuario(nodo.derecha, usuario);
        } else {
          // El usuario con el mismo ID ya existe, puedes manejar el caso como desees
          console.log("El usuario con el mismo ID ya existe. No se ha insertado.");
        }
      
        return nodo;
      }
    // Método para eliminar un usuario por su ID
    eliminarUsuarioPorId(id) {
      this.raiz = this._eliminarUsuarioPorId(this.raiz, id);
    }
  
    _eliminarUsuarioPorId(nodo, id) {
      if (nodo === null) {
        return nodo;
      }
  
      if (id < nodo.usuario.id) {
        nodo.izquierda = this._eliminarUsuarioPorId(nodo.izquierda, id);
      } else if (id > nodo.usuario.id) {
        nodo.derecha = this._eliminarUsuarioPorId(nodo.derecha, id);
      } else {
        if (nodo.izquierda === null) {
          return nodo.derecha;
        } else if (nodo.derecha === null) {
          return nodo.izquierda;
        }
  
        nodo.usuario = this._encontrarValorMinimo(nodo.derecha);
        nodo.derecha = this._eliminarUsuarioPorId(nodo.derecha, nodo.usuario.id);
      }
  
      return nodo;
    }
  
    _encontrarValorMinimo(nodo) {
      while (nodo.izquierda !== null) {
        nodo = nodo.izquierda;
      }
      return nodo.usuario;
    }
  
    // Método para actualizar un usuario por su ID
    actualizarUsuarioPorId(id, nuevoUsuario) {
      this.eliminarUsuarioPorId(id);
      this.insertarUsuario(nuevoUsuario);
    }
  }
  
  // Ejemplo de uso
  const arbolUsuarios = new ArbolUsuarios();
  const usuario1 = {
    id: 1,
    usuario: "brandon",
    password: "contra",
    nombre: "Brandon",
    apellidos: "Gomez"
  };
  const usuario2 = {
    id: 2,
    usuario: "USERPRO",
    password: "nomelase",
    nombre: "Pedro",
    apellidos: "Escobar"
  };
  const usuario3 = {
    id:3,
    usuario: "ROOT",
    password: "root123",
    nombre: "Miguel",
    apellidos: "Peres"
  };

  const usuario4 = {
    id:4,
    usuario: "Normal",
    password: "normal123",
    nombre: "Diego",
    apellidos: "Cruz"
  };
  
  arbolUsuarios.insertarUsuario(usuario1);
  arbolUsuarios.insertarUsuario(usuario2);
  arbolUsuarios.insertarUsuario(usuario3);
  arbolUsuarios.insertarUsuario(usuario4);
  arbolUsuarios.insertarUsuario(usuario4);

  
  console.log(arbolUsuarios.buscarUsuarioPorId(1)); // Buscar por ID
  arbolUsuarios.actualizarUsuarioPorId(1, {
    id: 1,
    usuario: "NuevoBrandon",
    password: "yamelase",
    nombre: "Brandon2",
    apellidos: "Alcazar"
  }); // Actualizar usuario
  console.log(arbolUsuarios.buscarUsuarioPorId(1));
  arbolUsuarios.eliminarUsuarioPorId(2); // Eliminar usuario
  console.log(arbolUsuarios.buscarUsuarioPorId(2));
  