import { esEmailCorrecto } from "../utilities/validadorEstudiante";

test("Email es correcto", () => {
    const esCorrecto = esEmailCorrecto("zs18012174@estudiantes.uv.mx");

    expect(esCorrecto).toBe(true);
})

test("Email es incorrecto", () => {
  const esCorrecto = esEmailCorrecto("qw1255@estudiantes.uv.mx");

  expect(esCorrecto).toBe(false);
});