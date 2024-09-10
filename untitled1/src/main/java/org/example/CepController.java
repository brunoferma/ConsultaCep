package org.example;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/cep")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class CepController {

    @GetMapping("/{cep}")
    public ResponseEntity<Endereco> buscarCep(@PathVariable String cep) {
        try {
            String json = CepService.buscarEndereco(cep);
            Endereco endereco = Endereco.fromJson(json);
            return endereco != null ? ResponseEntity.ok(endereco) : ResponseEntity.notFound().build();
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }
}