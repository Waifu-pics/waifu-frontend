import { Navbar as MantineNavbar, ThemeIcon, Title } from "@mantine/core"
import Icon from "@mdi/react"
import { mdiHome, mdiApi, mdiDominoMask, mdiLayersSearch, mdiUpload, mdiDiscord, mdiGithub } from "@mdi/js"
import { ChevronRight, ChevronLeft } from "tabler-icons-react"
import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme } from "@mantine/core"

const User: React.FC<{
    avatarUrl: string,
    username: string,
    id: string
}> = ({ avatarUrl, username, id }) => {
    const theme = useMantineTheme()

    return (
        <Box
            sx={{
                paddingTop: theme.spacing.sm,
                borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`
            }}>
            <UnstyledButton
                sx={{
                    display: "block",
                    width: "100%",
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

                    "&:hover": {
                        backgroundColor:
                            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
                    }
                }}>
                <Group>
                    <Avatar src={avatarUrl} radius="xl" />
                    <Box sx={{ flex: 1 }}>
                        <Text size="sm" weight={500}> {username}</Text>
                        <Text color="dimmed" size="xs">{id}</Text>
                    </Box>

                    {theme.dir === "ltr" ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </Group>
            </UnstyledButton>
        </Box>
    )
}

const NavHeader: React.FC = () => {
    return <Box
        sx={(theme) => ({
            paddingLeft: theme.spacing.xs,
            paddingRight: theme.spacing.xs,
            paddingBottom: theme.spacing.lg,
            borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`
        })}>
        <Group position="apart">
            <Title order={3}>WAIFU.PICS</Title>
        </Group>
    </Box>
}


const NavbarItem: React.FC<{
    icon: React.ReactNode;
    color: string;
    label: string;
}> = ({ icon, color, label }) => {
    return (
        <UnstyledButton
            sx={(theme) => ({
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

                "&:hover": {
                    backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
                }
            })}
        >
            <Group>
                <ThemeIcon color={color} variant="light">
                    {icon}
                </ThemeIcon>

                <Text size="sm">{label}</Text>
            </Group>
        </UnstyledButton>
    )
}

export const Navbar: React.FC = () => {
    return <MantineNavbar width={{ base: 300 }} p="xs">
        <MantineNavbar.Section mt="xs">
            <NavHeader />
        </MantineNavbar.Section>

        <MantineNavbar.Section grow>
            <NavbarItem
                icon={<Icon path={mdiHome} size={"18px"} />}
                color="teal"
                label="Home" />

            <NavbarItem
                icon={<Icon path={mdiDominoMask} size={"18px"} />}
                color="red"
                label="NSFW" />

            <NavbarItem
                icon={<Icon path={mdiLayersSearch} size={"18px"} />}
                color="green"
                label="Search and tags" />

            <NavbarItem
                icon={<Icon path={mdiUpload} size={"18px"} />}
                color="pink"
                label="Upload image" />

            <NavbarItem
                icon={<Icon path={mdiApi} size={"18px"} />}
                color="violet"
                label="Documentation" />
        </MantineNavbar.Section>

        <MantineNavbar.Section>
            <NavbarItem
                icon={<Icon path={mdiDiscord} size={"18px"} />}
                color="blue"
                label="Discord" />
            <NavbarItem
                icon={<Icon path={mdiGithub} size={"18px"} />}
                color="gray"
                label="Github" />
        </MantineNavbar.Section>

        <MantineNavbar.Section>
            <User
                username="Riku#1111"
                id="462828548080664577"
                avatarUrl="https://cdn.discordapp.com/avatars/462828548080664577/ea16f4044c41beed7b11be25193dfea3.jpg" />
        </MantineNavbar.Section>
    </MantineNavbar>
}