import * as yup from "yup";

const regexSenhaForte =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]\-_+=~`|\\:;"'<>,./?]).+$/;

export const esquemaCadastro = yup.object({
  nome: yup.string().required("O nome é obrigatório."),
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Informe um e-mail válido."),
  senha: yup
    .string()
    .required("A senha é obrigatória.")
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .matches(
      regexSenhaForte,
      "A senha deve conter maiúscula, minúscula, número e caractere especial.",
    ),
  confirmarSenha: yup
    .string()
    .required("A confirmação de senha é obrigatória.")
    .oneOf([yup.ref("senha")], "As senhas não coincidem."),
});

export type DadosCadastro = yup.InferType<typeof esquemaCadastro>;

export const esquemaLogin = yup.object({
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Informe um e-mail válido."),
  senha: yup.string().required("A senha é obrigatória."),
});

export type DadosLogin = yup.InferType<typeof esquemaLogin>;
