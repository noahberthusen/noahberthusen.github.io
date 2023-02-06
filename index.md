```bio-meta
{
    "name": "Noah F. Berthusen",
    "title": "Noah Berthusen",
    "description": "N. Berthusen&#8217;s curriculum vitae.",
    "url": "https://noahberthusen.github.io/",
    "assets": "https://noahberthusen.github.io/assets",
    "date-created": "2020-11-28",
    "repo": "https://github.com/noahberthusen/noahberthusen.github.io",
    "tilecolor": "#f2f2f2"
}
```

# Noah&nbsp;Berthusen

<figure class="gl-page-background gl-float-right gl-image-box" style="text-align: center;"><img src="assets/images/headshot.jpg" alt="A photo of J. Doe" width="160" height="160" style="max-width: 160px;" /></figure>

I'm a second year PhD student in computer science at the University of Maryland studying quantum computing and quantum error correction.

I received my undergraduate degree in Software Engineering at Iowa State University in May 2021.

I can be reached at <span id="_eml" class="gl-eml">someone at example dot com</span> or on <a href="https://www.linkedin.com/in/noah-berthusen-1a141a129/">LinkedIn</a>.

```bio-remove
Below we use a simple mechanism to mitigate email address reaping.
Change the encoding for your own email address.
```

<!--[bio][protect]
<script type="application/javascript">
window.setTimeout(function ()
{
var addr = [
  110, 102,  98, 101, 114,
  116,  64, 117, 109, 100,
   46, 101, 100, 117
];
addr = String.fromCharCode.apply(String, addr);
var eml = document.getElementById('_eml');
eml.innerHTML = '<a href="mailto:' + addr + '">' + addr + '</a>';
eml.removeAttribute('class');
}, 600);
</script>
[bio]-->


## Publications


```blog-bib

@comment
{
Use #bibitem_Venue_Key to refer to "Venue:Key".

It is possible to have multiple BibTeX blocks, which will be rendered independently. For example, you might want to have one block for each of "Publications", "Pre-prints", and "Manuscripts".

To support more information links (e.g., add "slides" or "pdf" links),
see "builder/marked.0.3.6/bibtex-service.js" line 109.
}

@misc{rl,
  author = {M. Sohaib Alam and Noah F. Berthusen and Peter P. Orth},
  title = {Quantum Logic Gate Synthesis as a Markov Decision Process},
  biosite_url = {https://arxiv.org/abs/1912.12002},
  biosite_venue = {GitHub},
  biosite_demo = {https://github.com/Orth-Research/circuit_rl}
}

@misc{impurity,
  author = {Anirban Mukherjee and Noah F. Berthusen and João C. Getelina and Peter P. Orth and Yong-Xin Yao},
  title = {Comparative study of adaptive variational quantum eigensolvers for multi-orbital impurity models},
  biosite_url = {https://arxiv.org/abs/2203.06745}
}

@misc{vtc,
  author = {Noah F. Berthusen and Thaís V. Trevisan and Tom Iadecola and Peter P. Orth},
  title = {Quantum dynamics simulations beyond the coherence time on NISQ hardware by variational Trotter compression},
  biosite_url = {https://arxiv.org/abs/2112.12654},
  bitsite_venue = {GitHub},
  biosite_demo = {https://gitlab.com/QANED/heis_dynamics}
 }

@misc{ml,
  author = {Noah F. Berthusen and Yuriy Sizyuk and Mathias S. Scheurer and Peter P. Orth},
  title = {Learning crystal field parameters using convolutional neural networks},
  biosite_url = {https://arxiv.org/abs/2011.12911},
  biosite_venue = {GitHub},
  biosite_demo = {https://github.com/Orth-Research/ml_cr}
}

@misc{vqe,
  author = {Feng Zhang and Niladri Gomes, and Noah F. Berthusen and Peter P. Orth and Cai-Zhuang Wang and Kai-Ming Ho, and Yong-Xin Yao},
  title = {Shallow-circuit variational quantum eigensolver based on symmetry-inspired Hilbert space partitioning for quantum chemical calculations},
  biosite_url = {https://arxiv.org/abs/2006.11213}
}

@misc{qite,
  author = {Niladri Gomes and Feng Zhang and Noah F. Berthusen and Cai-Zhuang Wang and Kai-Ming Ho and Peter P. Orth and Yong-Xin Yao},
  title = {Efficient step-merged quantum imaginary time evolution algorithm for quantum chemistry},
  biosite_url = {https://pubs.acs.org/doi/10.1021/acs.jctc.0c00666},
}

```

## Talks and Presentations


```blog-bib

@misc{circuit_compression,
	biosite_extra = {May 2021. Iowa State Honors Project poster presentation. See also the companion paper <a href="https://noahberthusen.github.io/assets/files/circuit_compression.pdf">here</a>. },
	title = {Efficient quantum circuit compression using Reinforcement Learning},
	biosite_venue = {GitHub},
	biosite_demo = {https://github.com/noahberthusen/circuit_rl},
	biosite_url = {https://noahberthusen.github.io/assets/files/rl_poster.pdf},
}

@misc{vqe-comparison,
	biosite_extra = {April 2021. Poster presentation for National Conference on Undergraduate Research (NCUR).},
	title = {Design of Quantum-classical Computing Hybrid Algorithms for Materials Simulation},
	biosite_url = {https://noahberthusen.github.io/assets/files/VQE_comparison.pdf}
}


@misc{vqe-talk,
  biosite_extra = {November 2020. Talk presented at Quantum computing reading group at ISU.},
  title = {Introduction to the variational quantum eigensolver method},
  biosite_url = {https://noahberthusen.github.io/assets/files/VQE.pdf}
}

@misc{benewop,
  biosite_extra = {August 2020. Oak Ridge National Lab SULI poster presentation.},
  title = {Benchmarking Noise Extrapolation on a Quantum Chip with OpenPulse},
  biosite_url = {https://noahberthusen.github.io/assets/files/Poster_benewop.pdf},
  biosite_venue = {GitHub},
  biosite_demo = {https://github.com/noahberthusen/benewop-benchmarking}
}

@misc{ncur,
  biosite_extra = {April 2020. Oral presentation at Iowa State Symposium on Undergraduate Research. National Conference on Undergraduate Research at the Montana State University, Bozeman, MT
 (cancelled due to Covid-19). },
  title = {Quantum variational algorithms apporach to solve the strongly correlated materials challenge},
  biosite_url = {https://iastate.app.box.com/s/crt2ntafxe7z9c2crrznurx2299ziad5/file/655919529632},
  biosite_venue = {GitHub},
  biosite_demo = {https://github.com/noahberthusen/qc_vqe}
}

@misc{schrodinger,
  biosite_extra = {March 2018. Poster presented Iowa State Honors Research Symposium.},
  title = {Machine Learning and the Schrödinger equation},
}


```
