import { Box, Flex, FormGroup, TextInput, Grid, Button, Dialog, Heading, Label, ButtonPrimary } from "@primer/components"

const CreateGigs = ({ isOpen, onDismiss }) => {
  return (
    <Dialog isOpen={isOpen} onDismiss={onDismiss}>
      <Dialog.Header>Buat layanan baru</Dialog.Header>
      <Box flexGrow={1} p={3} overflowY="auto" maxHeight="55vh">
        <FormGroup mt={0}>
          <FormGroup.Label htmlFor="new.gigs.title">Title</FormGroup.Label>
          <TextInput
            aria-label="title"
            as="textarea"
            id="new.gigs.title"
            name="title"
            variant="large"
            sx={{ display: "flex" }}
          />
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="new.gigs.category">Kategori</FormGroup.Label>
          <TextInput
            aria-label="category"
            id="new.gigs.category"
            name="category"
            type="text"
            variant="small"
          />
        </FormGroup>
        <Heading as="h3" fontSize={2} mt={4} mb={3}>Paket</Heading>
        <Grid
          gridTemplateColumns="repeat(2, auto)"
        >
          <Box>Basic</Box>
          <Box>
            <FormGroup mt={0}>
              <FormGroup.Label htmlFor="new.gigs.plan.basic.title">Judul</FormGroup.Label>
              <TextInput
                aria-label="basic.title"
                id="new.gigs.plan.basic.title"
                name="basic.title"
                type="text"
                variant="small"
              />
            </FormGroup>
            <FormGroup>
              <FormGroup.Label htmlFor="new.gigs.plan.basic.desc">Deskripsi</FormGroup.Label>
              <TextInput
                as="textarea"
                aria-label="basic.description"
                id="new.gigs.plan.basic.desc"
                name="basic.description"
                type="text"
                variant="small"
                sx={{ display: "flex" }}
              />
            </FormGroup>
            <FormGroup>
              <FormGroup.Label htmlFor="new.gigs.plan.basic.worktime">Waktu kerja</FormGroup.Label>
              <TextInput
                aria-label="basic.worktime"
                id="new.gigs.plan.basic.worktime"
                name="basic.worktime"
                type="text"
                variant="small"
              />
            </FormGroup>
            <FormGroup>
              <FormGroup.Label htmlFor="new.gigs.plan.basic.price">Harga <Label outline variant="small">Rp.</Label></FormGroup.Label>
              <TextInput
                aria-label="basic.price"
                id="new.gigs.plan.basic.price"
                name="basic.price"
                type="number"
                variant="small"
              />
            </FormGroup>
          </Box>

          <Box>Standard</Box>
          <Box>
            <FormGroup mt={0}>
              <FormGroup.Label htmlFor="new.gigs.plan.standard.title">Judul</FormGroup.Label>
              <TextInput
                aria-label="standard.title"
                id="new.gigs.plan.standard.title"
                name="standard.title"
                type="text"
                variant="small"
              />
            </FormGroup>
            <FormGroup>
              <FormGroup.Label htmlFor="new.gigs.plan.standard.desc">Deskripsi</FormGroup.Label>
              <TextInput
                as="textarea"
                aria-label="standard.description"
                id="new.gigs.plan.standard.desc"
                name="standard.description"
                type="text"
                variant="small"
                sx={{ display: "flex" }}
              />
            </FormGroup>
            <FormGroup>
              <FormGroup.Label htmlFor="new.gigs.plan.standard.worktime">Waktu kerja</FormGroup.Label>
              <TextInput
                aria-label="standard.worktime"
                id="new.gigs.plan.standard.worktime"
                name="standard.worktime"
                type="text"
                variant="small"
              />
            </FormGroup>
            <FormGroup>
              <FormGroup.Label htmlFor="new.gigs.plan.standard.price">Harga <Label outline variant="small">Rp.</Label></FormGroup.Label>
              <TextInput
                aria-label="standard.price"
                id="new.gigs.plan.standard.price"
                name="standard.price"
                type="number"
                variant="small"
              />
            </FormGroup>
          </Box>

          <Box>Premium</Box>
          <Box>
            <FormGroup mt={0}>
              <FormGroup.Label htmlFor="new.gigs.plan.premium.title">Judul</FormGroup.Label>
              <TextInput
                aria-label="premium.title"
                id="new.gigs.plan.premium.title"
                name="premium.title"
                type="text"
                variant="small"
              />
            </FormGroup>
            <FormGroup>
              <FormGroup.Label htmlFor="new.gigs.plan.premium.desc">Deskripsi</FormGroup.Label>
              <TextInput
                as="textarea"
                aria-label="premium.description"
                id="new.gigs.plan.premium.desc"
                name="premium.description"
                type="text"
                variant="small"
                sx={{ display: "flex" }}
              />
            </FormGroup>
            <FormGroup>
              <FormGroup.Label htmlFor="new.gigs.plan.premium.worktime">Waktu kerja</FormGroup.Label>
              <TextInput
                aria-label="premium.worktime"
                id="new.gigs.plan.premium.worktime"
                name="premium.worktime"
                type="text"
                variant="small"
              />
            </FormGroup>
            <FormGroup>
              <FormGroup.Label htmlFor="new.gigs.plan.premium.price">Harga <Label outline variant="small">Rp.</Label></FormGroup.Label>
              <TextInput
                aria-label="premium.price"
                id="new.gigs.plan.premium.price"
                name="premium.price"
                type="number"
                variant="small"
              />
            </FormGroup>
          </Box>

        </Grid>
        <Flex mt={3} justifyContent="flex-end">
          <Button mr={2}>Cancel</Button>
          <ButtonPrimary>Simpan</ButtonPrimary>
        </Flex>
      </Box>
    </Dialog>
  )
}

export default CreateGigs;