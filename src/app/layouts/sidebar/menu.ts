import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'Paquetes',
        icon: 'bx-package',
        subItems: [
            {
                id: 3,
                label: 'Entrada',
                link: '/',
                parentId: 2
            },
            {
                id: 4,
                label: 'Salida',
                link: '/',
                parentId: 2
            }
        ]
    },
    {
        id: 2,
        label: 'Configuración',
        icon: 'bx-cog',
        subItems: [
            {
                id: 3,
                label: 'Colaboradores',
                link: '/',
                parentId: 2
            },
            {
                id: 4,
                label: 'Vehiculos',
                link: '/configuracion/vehiculos',
                parentId: 2
            }
        ]
    },
];

