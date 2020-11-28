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

```bio-remove
<figure class="gl-page-background gl-float-right gl-image-box" style="text-align: center;"><img src="assets/images/hero-image.jpg" alt="A photo of J. Doe" width="160" height="160" style="max-width: 160px;" /></figure>```

I’m a second-year Ph.D. student in unknown discipline, advised by [unknown professor](https://example.com/). I am interested in some unknown specialized sub-area.

Prior to joining [unknown current university](https://example.com/), I obtained my bachelor’s degree from [unknown previous university](https://example.com/).

I can be reached at <span id="_eml" class="gl-eml">someone at example dot com</span>.

```bio-remove
Below we use a simple mechanism to mitigate email address reaping.
Change the encoding for your own email address.
```

<!--[bio][protect]
<script type="application/javascript">
window.setTimeout(function ()
{
var addr = [115,111,109,101,111,110,101,64,101,120,97,109,112,108,101,46,99,111,109];
addr = String.fromCharCode.apply(String, addr);
var eml = document.getElementById('_eml');
eml.innerHTML = '<a href="mailto:' + addr + '">' + addr + '</a>';
eml.removeAttribute('class');
}, 600);
</script>
[bio]-->

This is an example personal homepage built with [bio-site](https://github.com/GeeLaw/bio-site). It features simplicity and integration with BibTeX.

## Research

```blog-bib

@comment
{
Use #bibitem_Venue_Key to refer to "Venue:Key".

It is possible to have multiple BibTeX blocks, which will be rendered independently. For example, you might want to have one block for each of "Publications", "Pre-prints", and "Manuscripts".

To support more information links (e.g., add "slides" or "pdf" links),
see "builder/marked.0.3.6/bibtex-service.js" line 109.
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
@misc{vqe-talk,
  author = {Quantum computing reading group at ISU},
  title = {Introduction to the variational quantum eigensolver method},
  biosite_url = {https://noahberthusen.github.io/assets/files/VQE.pdf}
}

@misc{benewop,
  author = {Oak Ridge National Lab SULI poster presentation},
  title = {Benchmarking Noise Extrapolation on a Quantum Chip with OpenPulse},
  biosite_venue = {GitHub},
  biosite_demo = {https://github.com/noahberthusen/benewop-benchmarking}
}


```
