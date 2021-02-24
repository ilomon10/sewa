import { useContext, useEffect, useState } from "react";
import { Box, Dialog, FormGroup, TextInput, Text, Flex, Grid, Label, Button, ButtonPrimary, BorderBox } from "@primer/components";
import { useFieldArray, useForm } from "react-hook-form";
import _debounce from "lodash.debounce";

import { FeathersContext } from "../../components/feathers";
import AspectRatio from "../../components/AspectRatio";
import DropImage from "./DropImage";

const EditGigs = ({ data, onAccept, onDismiss }) => {
  const feathers = useContext(FeathersContext);
  const [catSuggetion, setCatSuggetion] = useState([]);
  const {
    register, control, handleSubmit, getValues, setValue, trigger,
    formState: { errors, isDirty, dirtyFields, isSubmitting }
  } = useForm({
    defaultValues: {
      media: data.media
    }
  });
  console.log(data.media);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
    keyName: "key"
  });

  const send = (d) => {
    let result = {};
    Object.keys(dirtyFields).forEach((key) => {
      result[key] = d[key];
    });

    if (result.media) {
      result.media = result.media.map(m => {
        const isNew = data.media.find(value => String(value.id) === m.id);
        return ({
          id: m.id,
          level: !isNew ? "medialink" : ""
        })
      })
    }

    feathers.gigs.patch(data.id, result)
      .then((res) => {
        console.log("result", res);
        onAccept(res);
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

  useEffect(() => {
    findCatSuggetion(data.category.title);
  }, []);
  return (
    <>
      <Dialog.Header>Edit layanan</Dialog.Header>
      <form onSubmit={handleSubmit(send)}>
        <Box flexGrow={1} p={3} overflowY="auto" maxHeight="55vh">
          <FormGroup mt={0}>
            <FormGroup.Label>Image ({fields.length}/3)</FormGroup.Label>

            <Flex mx={-2}>
              {fields
                .map(({ key, id, path }, idx) => (
                  <Box
                    key={key}
                    px={2}
                    width={`${100 / 3}%`}
                  >
                    <input type="hidden" name={`media[${idx}].id`} ref={register()} defaultValue={id} />
                    <input type="hidden" name={`media[${idx}].path`} ref={register()} defaultValue={path} />
                    <BorderBox p={1}
                      sx={{
                        "&:focus-within": {
                          borderColor: "blue.5",
                          boxShadow: "inset 0px 2px 0px rgb(225 228 232 / 20%), rgb(3 102 214 / 30%) 0px 0px 0px 0.2em"
                        }
                      }}>
                      <AspectRatio ratio="1:1">
                        <DropImage
                          sx={{ borderRadius: 4 }}
                          disabled={true}
                          file={{ id: id, url: path }}
                          onDelete={(file) => {
                            if (data.media.find(m => m.id === file.id)) {
                              feathers.gigsMedia.remove({ "gigs_id": data.id, "media_id": file.id }).then(() => {
                                remove(idx);
                              });
                            } else {
                              remove(idx);
                            }
                          }} />
                      </AspectRatio>
                    </BorderBox>
                  </Box>
                ))}
              {(fields.length < 3) &&
                <Box px={2} width={`${100 / 3}%`}>
                  <BorderBox p={1}
                    sx={{
                      "&:focus-within": {
                        borderColor: "blue.5",
                        boxShadow: "inset 0px 2px 0px rgb(225 228 232 / 20%), rgb(3 102 214 / 30%) 0px 0px 0px 0.2em"
                      }
                    }}>
                    <AspectRatio ratio="1:1">
                      <DropImage
                        sx={{ borderRadius: 4 }}
                        onUploaded={(file) => {
                          console.log(file);
                          append({ id: file.id, path: file.path });
                        }}
                      />
                    </AspectRatio>
                  </BorderBox>
                </Box>}
              {fields.length < 3 &&
                new Array(2 - fields.length).fill(0).map((_, idx) => (
                  <Box key={idx} px={2} width={`${100 / 3}%`}>
                    <BorderBox p={1}
                      sx={{
                        "&:focus-within": {
                          borderColor: "blue.5",
                          boxShadow: "inset 0px 2px 0px rgb(225 228 232 / 20%), rgb(3 102 214 / 30%) 0px 0px 0px 0.2em"
                        }
                      }}>
                      <AspectRatio ratio="1:1">
                        <DropImage sx={{ borderRadius: 4 }} disabled />
                      </AspectRatio>
                    </BorderBox>
                  </Box>
                ))}
            </Flex>
          </FormGroup>
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
              defaultValue={data.title}
              onChange={() => trigger("title")}
              sx={{
                display: "flex",
                borderColor: (isDirty && errors["title"])
                  ? "red.5" : "gray.2",
                "textarea": {
                  resize: "vertical",
                  minHeight: 50
                }
              }}
            />
            {errors["title"] &&
              <Text as={Box} mt={1} fontSize={1} color="red.5">
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
              defaultValue={data.category.title}
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
          <Grid gridTemplateColumns="repeat(2, auto)">
            <Box>Basic</Box>
            <Box>
              <FormGroup mt={0}>
                <FormGroup.Label htmlFor="new.gigs.plan.basic.title">Judul</FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
                  aria-label="basic.title"
                  id="new.gigs.plan.basic.title"
                  name="basic_title"
                  type="text"
                  variant="small"
                  defaultValue={data.basic_title}
                />
              </FormGroup>
              <FormGroup>
                <FormGroup.Label htmlFor="new.gigs.plan.basic.desc">Deskripsi</FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
                  as="textarea"
                  aria-label="basic.description"
                  id="new.gigs.plan.basic.desc"
                  name="basic_description"
                  type="text"
                  variant="small"
                  defaultValue={data.basic_description}
                  sx={{ display: "flex" }}
                />
              </FormGroup>
              <FormGroup>
                <FormGroup.Label htmlFor="new.gigs.plan.basic.worktime">Waktu kerja <Label outline variant="small">hari</Label></FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
                  aria-label="basic.worktime"
                  id="new.gigs.plan.basic.worktime"
                  name="basic_worktime"
                  type="number"
                  variant="small"
                  defaultValue={data.basic_worktime}
                />
              </FormGroup>
              <FormGroup>
                <FormGroup.Label htmlFor="new.gigs.plan.basic.price">Harga <Label outline variant="small">Rp.</Label></FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
                  aria-label="basic.price"
                  id="new.gigs.plan.basic.price"
                  name="basic_price"
                  type="number"
                  variant="small"
                  defaultValue={data.basic_price}
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
                  name="standard_title"
                  type="text"
                  variant="small"
                  defaultValue={data["standard_title"]}
                />
              </FormGroup>
              <FormGroup>
                <FormGroup.Label htmlFor="new.gigs.plan.standard.desc">Deskripsi</FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
                  as="textarea"
                  aria-label="standard.description"
                  id="new.gigs.plan.standard.desc"
                  name="standard_description"
                  type="text"
                  variant="small"
                  defaultValue={data["standard_description"]}
                  sx={{ display: "flex" }}
                />
              </FormGroup>
              <FormGroup>
                <FormGroup.Label htmlFor="new.gigs.plan.standard.worktime">Waktu kerja <Label outline variant="small">hari  </Label></FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
                  aria-label="standard.worktime"
                  id="new.gigs.plan.standard.worktime"
                  name="standard_worktime"
                  type="number"
                  variant="small"
                  defaultValue={data["standard_worktime"]}
                />
              </FormGroup>
              <FormGroup>
                <FormGroup.Label htmlFor="new.gigs.plan.standard.price">Harga <Label outline variant="small">Rp.</Label></FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
                  aria-label="standard.price"
                  id="new.gigs.plan.standard.price"
                  name="standard_price"
                  type="number"
                  variant="small"
                  defaultValue={data["standard_price"]}
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
                  name="premium_title"
                  type="text"
                  variant="small"
                  defaultValue={data["premium_title"]}
                />
              </FormGroup>
              <FormGroup>
                <FormGroup.Label htmlFor="new.gigs.plan.premium.desc">Deskripsi</FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
                  as="textarea"
                  aria-label="premium.description"
                  id="new.gigs.plan.premium.desc"
                  name="premium_description"
                  type="text"
                  variant="small"
                  defaultValue={data["premium_description"]}
                  sx={{ display: "flex" }}
                />
              </FormGroup>
              <FormGroup>
                <FormGroup.Label htmlFor="new.gigs.plan.premium.worktime">Waktu kerja <Label outline variant="small">hari</Label></FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
                  aria-label="premium.worktime"
                  id="new.gigs.plan.premium.worktime"
                  name="premium_worktime"
                  type="number"
                  variant="small"
                  defaultValue={data["premium_worktime"]}
                />
              </FormGroup>
              <FormGroup>
                <FormGroup.Label htmlFor="new.gigs.plan.premium.price">Harga <Label outline variant="small">Rp.</Label></FormGroup.Label>
                <TextInput
                  ref={register({ required: true })}
                  aria-label="premium.price"
                  id="new.gigs.plan.premium.price"
                  name="premium_price"
                  type="number"
                  variant="small"
                  defaultValue={data["premium_price"]}
                />
              </FormGroup>
            </Box>

          </Grid>
          <Flex mt={3} justifyContent="flex-end">
            <Button mr={2} onClick={() => onDismiss()}>Cancel</Button>
            <ButtonPrimary disabled={isSubmitting ? true : !isDirty} type="submit">Simpan</ButtonPrimary>
          </Flex>
        </Box>
      </form>
    </>
  )
}

export default EditGigs;