import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { useInView } from "react-intersection-observer";
import HeroBanner from "../components/HeroBanner.jsx";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-python";
import Divider from "@mui/material/Divider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/Download";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 10,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

export default function GettingStartedPage() {
  const [codeBlocks, setCodeBlocks] = useState({
    block1: "pip install git+https://github.com/RobustBench/robustbench.git # library for loading robust classifer\npip install foolbox # library for adversarial example generation\npip install timm==1.0.9 # fixes dependency issue with foolbox",
    block2: "from robustbench.utils import clean_accuracy\nfrom robustbench.utils import load_model\nimport matplotlib.pyplot as plt\nfrom torch import unique\nimport foolbox as fb\nimport numpy as np\nimport pickle\nimport torch\nimport os",
    block3: "import gdown\noutput_file = 'cifar10.pt'\nfile_id = \"1A5gQCE0bHZhBlfcLQ2fFP5UygpgVkdAX\"\ngdown.download(f\"https://drive.google.com/uc?id={file_id}\", output_file)",
    block4: "cifar_data = torch.load('cifar10.pt')",
    block5: "# Extract the images and labels tensors\nx_test = cifar_data['images']\ny_test = cifar_data['labels']\n\nprint(unique(y_test, return_counts=True))",
    block6: "print(x_test.shape, y_test.shape)\nprint(torch.max(x_test), torch.min(x_test))",
    block7: "model = load_model(model_name='Kireev2021Effectiveness_RLATAugMix', dataset='cifar10', threat_model='corruptions')",
    block8: "# Check if GPU is available and set the device accordingly\nif torch.cuda.is_available():\n    device = torch.device('cuda')\n    print(\"Using GPU:\", torch.cuda.get_device_name(0))\nelse:\n    device = torch.device('cpu')\n    print(\"Using CPU\")\n\nmodel = model.to(device)\nx_test = x_test.to(device)\ny_test = y_test.to(device)",
    block9: "model_fb = fb.PyTorchModel(model, bounds=(0, 1))",
    block10: "_, advs, success = fb.attacks.LinfPGD(rel_stepsize=0.1, steps=20)(model_fb, x_test, y_test, epsilons=[8/255])",
    block11: "print('Robust accuracy: {:.1%}'.format(1 - success.float().mean()))\nprint(clean_accuracy(model, x_test, y_test))",
    block12: "import torch\nimport matplotlib.pyplot as plt\nimport random\n\n# Pass the perturbed images through the model to get the predicted labels\nwith torch.no_grad():  # No need to track gradients during inference\n    logits_adv = model(advs[0].to('cuda'))  # Get the logits for the adversarial examples\n\n# Get the predicted labels from the logits\npredicted_labels_adv = torch.argmax(logits_adv, dim=1)\n\n# Find which examples were misclassified (where predicted label != true label)\nmisclassified_indices = (predicted_labels_adv != y_test.to('cuda')).nonzero(as_tuple=True)[0]\n\n# Get the misclassified original and perturbed images, true labels, and incorrect labels\nmisclassified_images = advs[0][misclassified_indices]\nmisclassified_original_images = x_test.to('cuda')[misclassified_indices]\nmisclassified_predicted_labels = predicted_labels_adv[misclassified_indices]\nmisclassified_true_labels = y_test.to('cuda')[misclassified_indices]\n\n# Choose a random subset of misclassified images to display\nnum_images_to_show = min(10, len(misclassified_images))  # Limit to 10 images for display\nrandom_indices = random.sample(range(len(misclassified_images)), num_images_to_show)\n\n# Class names (assuming CIFAR-10)\nclass_names = ['airplane', 'automobile', 'bird', 'cat', 'deer',\n               'dog', 'frog', 'horse', 'ship', 'truck']\n\n# Plot the original and misclassified perturbed images side by side\nplt.figure(figsize=(25, 5))\nfor i, idx in enumerate(random_indices):\n    # Original image\n    original_image = misclassified_original_images[idx]\n    true_label = misclassified_true_labels[idx].item()\n\n    # Perturbed image\n    perturbed_image = misclassified_images[idx]\n    incorrect_label = misclassified_predicted_labels[idx].item()\n\n    # Convert images from tensor to numpy and transpose from (C, H, W) to (H, W, C)\n    original_img = original_image.permute(1, 2, 0).cpu().numpy()\n    perturbed_img = perturbed_image.permute(1, 2, 0).cpu().numpy()\n\n    # Plot original image\n    plt.subplot(2, num_images_to_show, i+1)\n    plt.imshow(original_img, interpolation='none')\n    plt.title(f\"Original: {class_names[true_label]}\")\n    plt.axis('off')\n\n    # Plot perturbed (misclassified) image\n    plt.subplot(2, num_images_to_show, num_images_to_show + i + 1)\n    plt.imshow(perturbed_img, interpolation='none')\n    plt.title(f\"Perturbed: {class_names[incorrect_label]}\")\n    plt.axis('off')\n\nplt.tight_layout()\nplt.show()\n",
    block13: "# Create the 'challenge' directory if it doesn't exist\nos.makedirs('challenge', exist_ok=True)\n\n# Path to save the adversarial examples\nfile_path = os.path.join('challenge', 'advs.pkl')\n\n# Save the 'advs' object\nwith open(file_path, 'wb') as f:\n    pickle.dump(advs, f)",
    block14: ""
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  const handleCopy = (code) => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      console.error("No content found to copy!");
    }
  };

  return loading ? (
    <Typography align={"center"}>Loading...</Typography>
  ) : (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(50px)",
        transition: "all 0.6s ease",
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: "1700px",
          lg: "1900px",
          xl: "2100px",
        },
        mx: "auto",
        px: 2,
        overflow: "hidden",
      }}
    >
      <HeroBanner
        title="Getting Started"
        subtitle="Compete, Learn, and Outsmart AI Models in this Exciting Challenge!"
        imageUrl="https://picsum.photos/1200/600?image=491"
        color="white"
      />
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <StyledCard variant="outlined">
            <Box>
              <StyledCardContent>
                <Typography
                  variant="h4"
                  sx={{ mt: 2, mb: 2, fontWeight: "bold" }}
                >
                  Setup guide
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Choose the setup method that works best for you. Whether
                  you’re looking for a quick start or prefer more control, we’ve
                  got an option that fits your style.
                </Typography>

                <Typography variant="h6" sx={{ mb: 2 }}>
                  Pick Your Setup Option:
                </Typography>
                <ul
                  style={{
                    paddingLeft: "20px",
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
                  }}
                >
                  <li>
                    <b>Google Colab (Easy):</b> No installation needed. Just
                    open it in your browser, and you’re good to go. Ideal for
                    those who want to get straight to the action. 💻
                  </li>
                  <li>
                    <b>Jupyter Notebook (Moderate):</b> Download our notebook
                    and run it on your local machine. A bit more setup, but it
                    gives you greater control over your environment. ⚙️
                  </li>
                  <li>
                    <b>Local Setup (Advanced):</b> Want full control? Set
                    everything up from scratch on your own system. A little more
                    work upfront, but perfect for those who like to customize.
                    🛠️
                  </li>
                </ul>

                <Box sx={{ mb: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    startIcon={<PlayArrowIcon />}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://colab.research.google.com/drive/1Vb6C_ImP-vfS0a9LHAPGtwSR_oB7sTdB?usp=sharing"
                    sx={{
                      mr: 2,
                      boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                      fontSize: "1rem",
                    }}
                  >
                    Open Google Colab (Easy)
                  </Button>

                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    startIcon={<DownloadIcon />}
                    sx={{
                      mr: 2,
                      boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                      fontSize: "1rem",
                    }}
                  >
                    Download Notebook (Moderate)
                  </Button>

                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    startIcon={<DownloadIcon />}
                    sx={{
                      boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                      fontSize: "1rem",
                    }}
                  >
                    Download DataSet (Advanced)
                  </Button>
                </Box>

                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Not sure which one to choose? Start with Google Colab for the
                  easiest setup, then move to the more advanced options as you
                  need more flexibility.
                </Typography>
              </StyledCardContent>
            </Box>
          </StyledCard>
        </Grid>

        <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
                Local Setup (Advanced)
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                This section will guide you through setting up the project on
                your own machine. It involves installing dependencies and
                setting up your environment from scratch.
                <ul
                  style={{
                    paddingLeft: "20px",
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
                  }}
                >
                  <li>Install the required libraries and dependencies.</li>
                  <li>Set up your virtual environment (recommended).</li>
                  <li>
                    Ensure that Python is installed and compatible with the
                    project (version 3.8 or higher).
                  </li>
                </ul>
              </Typography>

              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Once you’re ready, follow the steps below to begin the local
                setup process.
              </Typography>
              <Divider />
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4 }}>
                Step 1: Install Dependencies
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Before starting, ensure you have installed the necessary
                libraries for this project. Follow these steps:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Ensure you have Python installed (version 3.8 or higher).
                </li>
                <li>
                  Create a virtual environment to manage dependencies (optional,
                  but recommended).
                </li>
                <li>
                  Run the following commands to install the required libraries:
                  <ul
                    style={{
                      paddingLeft: "20px",
                      fontSize: "1.05rem",
                      lineHeight: 1.7,
                    }}
                  >
                    <li>
                      <code>RobustBench</code>: For loading pre-trained robust
                      classifiers.
                    </li>
                    <li>
                      <code>Foolbox</code>: For generating adversarial examples.
                    </li>
                  </ul>
                </li>
              </ul>

              <Box sx={{ position: "relative", mb: 4 }}>
                <pre className="language-python">
                  <code className="language-python">{codeBlocks.block1}</code>
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleCopy(codeBlocks.block1)}
                  sx={{ mt: 1 }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4 }}>
                Step 2: Load the Model
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Now, let's load a pre-trained robust model using RobustBench.
                Follow these instructions:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Import the necessary libraries to handle models, data, and
                  adversarial examples:
                </li>
                <ul
                  style={{
                    paddingLeft: "20px",
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
                  }}
                >
                  <li>
                    <code>RobustBench</code> for model loading.
                  </li>
                  <li>
                    <code>Foolbox</code> for handling adversarial examples.
                  </li>
                  <li>
                    <code>torch</code> and other supporting libraries.
                  </li>
                </ul>
                <li>
                  Use <code>load_model</code> to load a pre-trained robust model
                  that is resistant to adversarial attacks.
                </li>
              </ul>

              <Box sx={{ position: "relative", mb: 4 }}>
                <pre className="language-python">
                  <code className="language-python">{codeBlocks.block2}</code>
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleCopy(codeBlocks.block2)}
                  sx={{ mt: 1 }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4 }}>
                Step 3: Download the CIFAR-10 Dataset
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                The CIFAR-10 dataset is used for testing adversarial examples.
                Follow these steps:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Download the CIFAR-10 dataset from the provided URL using the
                  following command:
                </li>
                <li>
                  Ensure the dataset is stored in the correct directory on your
                  system.
                </li>
              </ul>

              <Box sx={{ position: "relative", mb: 4 }}>
                <pre className="language-python">
                  <code className="language-python">{codeBlocks.block3}</code>
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleCopy(codeBlocks.block3)}
                  sx={{ mt: 1 }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4 }}>
                Step 4: Process the Data
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Now that you have the CIFAR-10 dataset, we need to process it to
                prepare for generating adversarial examples. Follow these steps:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>Load the CIFAR-10 dataset using PyTorch.</li>
                <li>
                  The dataset contains images and labels, which we will use in
                  the next steps.
                </li>
                <li>
                  Ensure the data is correctly loaded and ready for use in
                  adversarial attacks.
                </li>
              </ul>

              <Box sx={{ position: "relative", mb: 4 }}>
                <pre className="language-python">
                  <code className="language-python">{codeBlocks.block4}</code>
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleCopy(codeBlocks.block4)}
                  sx={{ mt: 1 }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4 }}>
                Step 5: Extract the Images and Labels
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Now we will extract the images and labels from the CIFAR-10
                dataset, which are required for generating adversarial examples:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Extract the images and labels tensors from the CIFAR-10
                  dataset.
                </li>
                <li>Verify that the labels match the number of images.</li>
                <li>
                  Print the counts of each class to ensure the data was
                  extracted correctly.
                </li>
              </ul>

              <Box sx={{ position: "relative", mb: 4 }}>
                <pre className="language-python">
                  <code className="language-python">{codeBlocks.block5}</code>
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleCopy(codeBlocks.block5)}
                  sx={{ mt: 1 }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4 }}>
                Step 6: Inspect the Data
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                It’s good practice to inspect your data before proceeding. Let’s
                verify that the images and labels are correctly formatted:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Print the shape of the image and label tensors to confirm they
                  match the expected dimensions.
                </li>
                <li>
                  Check the pixel values to ensure they fall within the correct
                  range.
                </li>
              </ul>

              <Box sx={{ position: "relative", mb: 4 }}>
                <pre className="language-python">
                  <code className="language-python">{codeBlocks.block6}</code>
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleCopy(codeBlocks.block6)}
                  sx={{ mt: 1 }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4 }}>
                Step 7: Load the Robust Model
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Now, let’s load the robust model, which has been trained to be
                resistant to certain adversarial attacks. Follow these steps:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Use the <code>RobustBench</code> library to load a pre-trained
                  robust model.
                </li>
                <li>
                  Ensure the model is compatible with the CIFAR-10 dataset and
                  your threat model.
                </li>
              </ul>

              <Box sx={{ position: "relative", mb: 4 }}>
                <pre className="language-python">
                  <code className="language-python">{codeBlocks.block7}</code>
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleCopy(codeBlocks.block7)}
                  sx={{ mt: 1 }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4 }}>
                Step 8: Utilize GPU for Faster Computation
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                To speed up computation, you can use a GPU if available. If not,
                the script will fall back to using the CPU:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Check if a GPU is available on your system using PyTorch.
                </li>
                <li>
                  If a GPU is available, move the model and data to the GPU.
                </li>
                <li>
                  If no GPU is available, the script will automatically use the
                  CPU.
                </li>
              </ul>

              <Box sx={{ position: "relative", mb: 4 }}>
                <pre className="language-python">
                  <code className="language-python">{codeBlocks.block8}</code>
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleCopy(codeBlocks.block8)}
                  sx={{ mt: 1 }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4 }}>
                Step 9: Set Up Foolbox for Adversarial Attacks
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                In this step, we set up Foolbox to work with our PyTorch model.
                Foolbox will allow us to run adversarial attacks on the model:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Wrap your robust model with Foolbox to prepare it for
                  adversarial attacks.
                </li>
                <li>
                  Ensure the model is set up with correct bounds for pixel
                  values (0 to 1).
                </li>
              </ul>

              <Box sx={{ position: "relative", mb: 4 }}>
                <pre className="language-python">
                  <code className="language-python">{codeBlocks.block9}</code>
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleCopy(codeBlocks.block9)}
                  sx={{ mt: 1 }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4 }}>
                Step 10: Generate Adversarial Examples
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Now we will use the Projected Gradient Descent (PGD) method to
                generate adversarial examples:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>Set up and run the PGD attack on the robust model.</li>
                <li>
                  Generate adversarial examples by slightly modifying the
                  CIFAR-10 test images.
                </li>
                <li>Record which examples successfully fool the model.</li>
              </ul>

              <Box sx={{ position: "relative", mb: 4 }}>
                <pre className="language-python">
                  <code className="language-python">{codeBlocks.block10}</code>
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleCopy(codeBlocks.block10)}
                  sx={{ mt: 1 }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4 }}>
                Step 11: Evaluate Model Accuracy After Attack
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                After generating adversarial examples, evaluate the model’s
                accuracy to see how well it performs under attack:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>Measure the robust accuracy of the model under attack.</li>
                <li>
                  Print the results and compare the clean accuracy with the
                  robust accuracy.
                </li>
              </ul>

              <Box sx={{ position: "relative", mb: 4 }}>
                <pre className="language-python">
                  <code className="language-python">{codeBlocks.block11}</code>
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleCopy(codeBlocks.block11)}
                  sx={{ mt: 1 }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4 }}>
                Step 12: Visualize the Results
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Let’s visualize the original images and their adversarial
                counterparts to see how slight changes in the image can fool the
                model:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Select a random subset of images that were misclassified after
                  the attack.
                </li>
                <li>
                  Display the original images alongside their adversarial
                  versions.
                </li>
                <li>
                  Use <code>matplotlib</code> to visualize the comparison.
                </li>
              </ul>

              <Box sx={{ position: "relative", mb: 4 }}>
                <pre className="language-python">
                  <code className="language-python">{codeBlocks.block12}</code>
                </pre>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleCopy(codeBlocks.block12)}
                  sx={{ mt: 1 }}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}
