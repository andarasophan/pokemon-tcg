export class TypesImage {
  // get photo from pokemontcg.guru assets :)
  static getPhotoUrl (type) {
    let baseUrl = 'https://pokemontcg.guru'
    switch (type) {
      case 'Colorless':
        baseUrl += '/assets/colorless-fd5125f53e603b89cdfc6984ab4cea8e3ed43323a8d84bee6a774db1ea8c3dae.png'
        break
      case 'Darkness':
        baseUrl += '/assets/darkness-d766bdc83589235f104c3c3892cff4de80048e7a729f24b6e5e53a1838c7ebfa.png'
        break
      case 'Dragon':
        baseUrl += '/assets/dragon-3445aa07cd2c2380ae8e61f4ec47c7d678b4ab4268db16f95f66a04ecdd5200f.png'
        break
      case 'Fairy':
        baseUrl += '/assets/fairy-aa8ddf0f7c5b65b6d01c40652c1661b706720feaf8e3f1ffa64f7b486439bb08.png'
        break
      case 'Fighting':
        baseUrl += '/assets/fighting-5fcb6e1f157032efac4f6830d88759e83e66530354a297b112fff24c152e8d3c.png'
        break
      case 'Fire':
        baseUrl += '/assets/fire-76e636965a1e28800904de4abbf84ade3b019bbbce7021987f379971f881c2b5.png'
        break
      case 'Grass':
        baseUrl += '/assets/grass-ec3509d75db6cd146139044107045ccb5bcbb528b02c3de89d709a7be4a0bf90.png'
        break
      case 'Lightning':
        baseUrl += '/assets/lightning-732a70ef2e2dab4cc564fbf4d85cad48b0ac9ece462be3d42166a6fea4085773.png'
        break
      case 'Metal':
        baseUrl += '/assets/metal-076b10c3700a68913c376f841b46a1d63c3895247385b4360bc70739289179b7.png'
        break
      case 'Psychic':
        baseUrl += '/assets/psychic-503107a3ed9d9cce58e290677918f057ea6dc4e75042f2a627a5dd8a8bf6af9e.png'
        break
      case 'Water':
        baseUrl += '/assets/water-6b0bc3ea40b358d372e8be04aa90be9fb74e3e46ced6824f6b264cc2a7c7e32a.png'
        break
    }
    return baseUrl
  }
}
