import { Box, Flex, FormGroup, TextInput, Grid, Button, Dialog, Heading, Label, ButtonPrimary, Text } from "@primer/components"
import { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FeathersContext } from "../../components/feathers";
import _debounce from "lodash.debounce";

const CreateGigs = ({ isOpen, onDismiss }) => {
  const feathers = useContext(FeathersContext);
  const [catSuggetion, setCatSuggetion] = useState([]);
  const { register, handleSubmit, setValue, trigger, formState: { errors, isDirty } } = useForm();

  const send = (data) => {
    const result = {
      title: data.title,
      categoryId: catSuggetion.find(cat => cat.title === data.category).id,

      basic_title: data.basic.title,
      basic_description: data.basic.description,
      basic_worktime: data.basic.worktime,
      basic_price: data.basic.price,

      standard_title: data.standard.title,
      standard_description: data.standard.description,
      standard_worktime: data.standard.worktime,
      standard_price: data.standard.price,

      premium_title: data.premium.title,
      premium_description: data.premium.description,
      premium_worktime: data.premium.worktime,
      premium_price: data.premium.price,
    };
    console.log(result);
    feathers.gigs.create(result).then((res)=> {
      console.log(res);
    });
  }

  const findCatSuggetion = _debounce((value, callback) => {
    feathers.categories.find({
      query: {
        title: { $like: `%${value}%` },
        $select: ["id", "title"]
      }
    }).then((res) => {
      setCatSuggetion(res.data);
      if (typeof callback === "function") callback();
    });
  }, 1000);

  return (
    <Dialog isOpen={isOpen} onDismiss={onDismiss}>
      <Dialog.Header>Buat layanan baru</Dialog.Header>
      <form onSubmit={handleSubmit(send)}>
        <Box flexGrow={1} p={3} overflowY="auto" maxHeight="55vh">
          <FormGroup mt={0}>
            <FormGroup.Label htmlFor="new.gigs.title">Title</FormGroup.Label>
            <TextInput
              autoComplete="off"
              ref={register({ required: true, minLength: 8 })}
              aria-label="title"
              as="textarea"
              id="new.gigs.title"
              name="title"
              variant="large"
              onChange={() => trigger("title")}
              sx={{
                display: "flex",
                borderColor: (isDirty && errors["title"])
                  ? "red.5" : "gray.2"
              }}
            />
            {errors["title"] &&
              <Text as={Box} mt={1} fontSize={1}>
                {(errors["title"]["type"] === "required") && "Harus ada isi"}
                {(errors["title"]["type"] === "minLength") && "Harus lebih dari 8 huruf"}
              </Text>}
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="new.gigs.category">Kategori</FormGroup.Label>
            <TextInput
              autoComplete="off"
              ref={register({
                required: true,
                validate: value => !!catSuggetion.find(cat => cat.title === value)
              })}
              aria-label="category"
              id="new.gigs.category"
              name="category"
              type="text"
              variant="small"
              onChange={(e) => {
                findCatSuggetion(
                  e.target.value,
                  () => trigger("category")
                );
              }}
              sx={{
                borderColor: (isDirty && errors["category"])
                  ? "red.5" : "gray.2"
              }}
            />
            {catSuggetion.length > 0 &&
              <Flex mt={1}>
                <Text as={Box} fontSize={1}>Tersedia </Text>
                <Flex flexWrap="wrap" my={-1}>
                  {catSuggetion.map(({ title, id }) => (
                    <Label
                      key={id}
                      variant="small"
                      outline
                      my={1}
                      mx={1}
                      onClick={() => {
                        setValue("category", title, { shouldValidate: true });
                      }}
                      sx={{ cursor: "pointer" }}
                    >{title}</Label>
                  ))}
                </Flex>
              </Flex>}
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
                  ref={register({ required: true })}
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
                  ref={register({ required: true })}
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
                <FormGroup.Label htmlFor="new.gigs.plan.basic.worktime">Waktu kerja <Label outline variant="small">hari</Label></FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
                  aria-label="basic.worktime"
                  id="new.gigs.plan.basic.worktime"
                  name="basic.worktime"
                  type="number"
                  variant="small"
                />
              </FormGroup>
              <FormGroup>
                <FormGroup.Label htmlFor="new.gigs.plan.basic.price">Harga <Label outline variant="small">Rp.</Label></FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
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
                  ref={register({ required: true })}
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
                  ref={register({ required: true })}
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
                <FormGroup.Label htmlFor="new.gigs.plan.standard.worktime">Waktu kerja <Label outline variant="small">hari  </Label></FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
                  aria-label="standard.worktime"
                  id="new.gigs.plan.standard.worktime"
                  name="standard.worktime"
                  type="number"
                  variant="small"
                />
              </FormGroup>
              <FormGroup>
                <FormGroup.Label htmlFor="new.gigs.plan.standard.price">Harga <Label outline variant="small">Rp.</Label></FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
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
                  ref={register({ required: true })}
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
                  ref={register({ required: true })}
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
                <FormGroup.Label htmlFor="new.gigs.plan.premium.worktime">Waktu kerja <Label outline variant="small">hari</Label></FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
                  aria-label="premium.worktime"
                  id="new.gigs.plan.premium.worktime"
                  name="premium.worktime"
                  type="number"
                  variant="small"
                />
              </FormGroup>
              <FormGroup>
                <FormGroup.Label htmlFor="new.gigs.plan.premium.price">Harga <Label outline variant="small">Rp.</Label></FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
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
            <ButtonPrimary type="submit">Simpan</ButtonPrimary>
          </Flex>
        </Box>
      </form>
    </Dialog>
  )
}

export default CreateGigs;