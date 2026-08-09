//src/types/InNewMember.ts

export interface NewMember{
    nombre: string;
    apellido: string;
    edad: number;
    sexo: string;
    rol: string;
    imagen: string;
    link: string;
}

export interface Member extends NewMember {
    id: string;
}

export interface CardIntegrantesProps extends Member {
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}